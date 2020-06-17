<template>
  <div>
    <v-card
      flat
    >
      <div class="d-flex justify-start justify-space-between">
        <div>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="titleField"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование целевого раздела"
                type: String
                hint="Не менее 3-х и не более 15-ти символов"
                :error-messages="childTitleFieldErrors"
                @blur="$v.childTitleField.$touch()"
                dense
                outlined
                small
                clearable
                counter="15"
              >
              </v-text-field>
            </div>
            <div>
              <colorPicker
                :colorsIgnore = "colorsIgnore"
              />
            </div>
          </div>
          <div>
            <v-text-field
              v-model="commentField"
              hint="не более 100 символов"
              :error-messages="childCommentFieldErrors"
              @blur="$v.childCommentField.$touch()"
              class="pa-1 pb-0"
              label="Комментарий  целевому разделу"
              dense
              rows="1"
              outlined
              small
              clearable
              counter="100"
            >
            </v-text-field>
          </div>
          <v-col
            cols="12"
            class="d-flex justify-start pa-0 my-0"
          >
            <v-col
              cols="4"
              class="pa-0 my-0"
            >
              <h3>Типы операций:</h3>
            </v-col>
            <v-col
              class="pa-0 my-0"
              cols="4"
            >
              <v-switch
                v-model="expenses"
                @change="toChangeSwitch('expenses', expenses)"
                class="pa-0 my-0"
                label="Расходы"
                color="success"
              >
              </v-switch>
            </v-col>
            <v-col
              class="pa-0 my-0"
              cols="4"
            >
              <v-switch
                v-model="entrances"
                @change="toChangeSwitch('entrances', entrances)"
                class="pa-0 my-0"
                label="Поступления"
                color="primary"
              >
              </v-switch>
            </v-col>
          </v-col>
        </div>
        <div class="d-flex" >
          <div class="d-flex justify-space-around flex-column align-center ">
            <div>
              <v-btn
                @click="button('remove')"
                class="mx-2"
                outlined
                color="red"
              >Удалить
              </v-btn>
            </div>
            <div>
              <v-btn
                @click="button('cancel')"
                class="mx-2"
                outlined
                color="green"
              >Отменить
              </v-btn>
            </div>
            <div>
              <v-btn
                class="mx-2"
                outlined
                color="primary"
                @click="button('create')"
              >
                Сохранить
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import targets from '@/mixins/targets.js'
import colorPicker from '@/components/colorPicker'
export default {
  name: 'editSectionTargets',
  mixins: [validationMixin, targets],
  components: {
    colorPicker
  },
  data () {
    return {
      titleField: '',
      commentField: '',
      expenses: true,
      entrances: true,
      mode: ''
    }
  },
  validations: {
    childTitleField: {
      unique: function () {
        return this.valСhildTitleField.unique
      },
      length: function () {
        return this.valСhildTitleField.length
      }
    },
    childCommentField: {
      length: function () {
        return this.valСhildComentField.length
      }
    }
  },
  computed: {
    colorsIgnore () {
      this.toChgByEditItem()
      return this.MXcolorsIgnoreArray()
    },
    valСhildTitleField () {
      let unique = true
      const findUnique = this.MXsectionTargets()
        .find(item => item.title.toLowerCase() === this.childTitleField.toLowerCase())
      if (findUnique) { unique = false }
      if (this.getEditItem().title) {
        if (this.getEditItem() && this.childTitleField.toLowerCase() ===
            this.getEditItem().title.toLowerCase()) {
          unique = true
        }
      }
      let length = true
      this.childTitleField.length > 2 && this.childTitleField.length < 31
        ? length = true : length = false
      return {
        length: length,
        unique: unique
      }
    },
    valСhildComentField () {
      const valСhildCommentField = {}
      let length = true
      this.childCommentField.length < 100 ? length = true : length = false
      valСhildCommentField.length = length
      return valСhildCommentField
    },
    childTitleField () {
      if (this.titleField) {
        return this.titleField
      } else {
        return ''
      }
    },
    childCommentField () {
      if (this.commentField) {
        return this.commentField
      } else {
        return ''
      }
    },
    childTitleFieldErrors () {
      const errors = []
      if (!this.$v.childTitleField.$dirty) return errors
      !this.$v.childTitleField.length && errors.push('Не менее 3-х и не более 30-ти символов')
      !this.$v.childTitleField.unique && errors.push('Наименование уже существует')
      return errors
    },
    childCommentFieldErrors () {
      const errors = []
      if (!this.$v.childCommentField.$dirty) return errors
      !this.$v.childCommentField.length && errors.push('Не более 100 символов')
      return errors
    }
  },
  methods: {
    getEditItem () {
      return this.$store.getters.editItem
    },
    toChgByEditItem () {
      if (this.getEditItem().id) {
        this.mode = 'edit'
        this.titleField = this.getEditItem().title
        this.commentField = this.getEditItem().comment
        this.expenses = this.getEditItem().expenses
        this.entrances = this.getEditItem().entrances
        this.$store.dispatch('colorPicker', this.getEditItem().color)
      }
    },
    toChangeSwitch (type, val) {
      if (type === 'expenses') {
        this.expenses = val
        if (!this.expenses) { this.entrances = true }
      } else {
        this.entrances = val
        if (!this.entrances) { this.expenses = true }
      }
    },
    button (mode) {
      if (this.getEditItem().id && mode === 'create') { mode = 'edit' }
      const item = {}
      switch (mode) {
        case 'create':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.title = this.childTitleField
          item.comment = this.childCommentField
          item.color = this.$store.getters.colorPicker
          item.sectionId = ''
          item.type = 'section'
          item.groupId = ''
          item.expenses = this.expenses
          item.entrances = this.entrances
          this.MXtoCreate(item)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.expenses = true
          this.entrances = true
          this.$store.dispatch('colorPicker', '')
          this.$v.$reset()
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.id = this.getEditItem().id
          item.title = this.childTitleField
          item.comment = this.childCommentField
          item.color = this.$store.getters.colorPicker
          item.sectionId = ''
          item.type = 'section'
          item.groupId = ''
          item.expenses = this.expenses
          item.entrances = this.entrances
          this.MXtoEdit(item)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.expenses = true
          this.entrances = true
          this.$store.dispatch('colorPicker', '')
          this.$v.$reset()
          break
        case 'remove':
          this.MXtoRemove(this.getEditItem().id)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.expenses = true
          this.entrances = true
          this.$store.dispatch('colorPicker', '')
          this.$v.$reset()
          break
        default: // cancel
          this.targetTable = 'targets'
          this.editItem = {}
          this.titleField = ''
          this.commentField = ''
          this.expenses = true
          this.entrances = true
          this.$store.dispatch('chgEditItem', {})
          this.$v.$reset()
      }
      this.$store.dispatch('chgItemMode', 'default')
      this.$store.dispatch('chgEditItem', {})
    }
  }
}
</script>

<style scoped>

</style>
