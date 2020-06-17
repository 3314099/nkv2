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
                @input="chgSearchField()"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование раздела"
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
              label="Комментарий"
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
            <div v-if="getEditMode() === 'edit'">
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
                @click="button('save')"
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
import sections from '@/mixins/sections.js'
import colorPicker from '@/components/colorPicker'
export default {
  name: 'categoryEdit',
  mixins: [validationMixin, sections],
  components: {
    colorPicker
  },
  data () {
    return {
      titleField: '',
      commentField: '',
      expenses: true,
      entrances: true
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
      const findUnique = this.MXsections()
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
      !this.$v.childTitleField.length && errors.push('Не менее 3-х и не более 15-ти символов')
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
    getEditMode () {
      return this.$store.getters.editMode
    },
    getEditItem () {
      return this.$store.getters.editItem
    },
    chgSearchField () {
      let searchField = ''
      if (this.childTitleField) {
        searchField = this.childTitleField
      } else {
        searchField = ''
      }
      this.$store.dispatch('chgSearchField', searchField)
    },
    toChgByEditItem () {
      if (this.getEditItem().id) {
        this.mode = 'edit'
        this.titleField = this.getEditItem().title
        this.commentField = this.getEditItem().comment
        this.expenses = this.getEditItem().expenses
        this.entrances = this.getEditItem().entrances
        this.$store.dispatch('colorPicker', this.getEditItem().color)
      } else {
        this.titleField = this.$store.getters.searchField
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
      if (mode === 'save') { mode = this.getEditMode() }
      const item = {}
      switch (mode) {
        case 'create':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          this.$store.dispatch('chgLoading', 'true')
          item.title = this.childTitleField
          item.comment = this.childCommentField
          item.color = this.$store.getters.colorPicker
          this.MXtoCreateSection(item)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.$store.dispatch('colorPicker', '')
          this.$store.dispatch('chgSearchField', '')
          this.$store.dispatch('chgEditMode', '')
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
          this.MXtoEdit(item)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.$store.dispatch('colorPicker', '')
          this.$store.dispatch('chgSearchField', '')
          this.$store.dispatch('chgEditMode', '')
          this.$v.$reset()
          break
        case 'remove':
          this.$store.dispatch('chgLoading', 'true')
          this.MXtoRemove(this.getEditItem().id)
          this.mode = ''
          this.titleField = ''
          this.commentField = ''
          this.$store.dispatch('colorPicker', '')
          this.$store.dispatch('chgEditMode', '')
          this.$v.$reset()
          break
        default: // cancel
          this.mode = ''
          this.$store.dispatch('chgSearchField', '')
          this.$store.dispatch('chgEditMode', '')
          this.titleField = ''
          this.commentField = ''
          // this.$store.dispatch('chgEditItem', {})
          // this.$store.dispatch('chgItemMode', 'default')
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
