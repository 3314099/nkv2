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
                label="Наименование категории"
                type: String
                hint="Не менее 3-х и не более 15-ти символов"
                :error-messages="titleFieldErrors"
                @blur="$v.titleField.$touch()"
                dense
                outlined
                small
                clearable
                counter="15"
              >
              </v-text-field>
            </div>
            <div>
              <v-text-field
                v-model="stdFPCatGroup.title"
                class="pa-1"
                style="min-width: 500px"
                value=""
                label="Группа категорий (выберите в левом меню)"
                :error-messages="stdFPCatGroupErrors"
                @blur="$v.stdFPCatGroup.$touch()"
                outlined
                readonly
                dense
              ></v-text-field>
            </div>
          </div>
          <div>
            <v-text-field
              v-model="commentField"
              hint="не более 100 символов"
              :error-messages="commentFieldErrors"
              @blur="$v.commentField.$touch()"
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
                hide-details
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
              hide-details
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
import { eventEmitter } from '@/main'
import { validationMixin } from 'vuelidate'
import FPcategories from '@/mixins/FinPlan/FPcategories.js'

export default {
  name: 'FPcategoryEdit',
  mixins: [validationMixin, FPcategories],
  components: {
  },
  data () {
    return {
      expenses: true,
      entrances: true
    }
  },
  validations: {
    titleField: {
      unique: function () {
        return this.valTitleField.unique
      },
      length: function () {
        return this.valTitleField.length
      }
    },
    commentField: {
      length: function () {
        return this.valСommentField.length
      }
    },
    stdFPCatGroup: {
      selected: function () {
        return this.valStdFPCatGroup.selected
      }
    }
  },
  created: function () {
    this.toChgByEditItem()
    eventEmitter.$on('toChgByEditItem', () => {
      this.toChgByEditItem()
    })
  },
  computed: {
    titleField: {
      get: function () {
        return this.$store.getters.searchField
      },
      set: function (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('chgSearchField', searchField)
      }
    },
    stdFPCatGroup: {
      get: function () {
        const stdFPCatGroup = this.$store.getters.stdFPCatGroup
        if (!stdFPCatGroup.id) {
          stdFPCatGroup.title = 'Выберите группу категорий в левом меню'
        }
        return stdFPCatGroup
      },
      set: function (v) {
        if (v) {
        } else {
          this.$store.dispatch('chgStdFPCatGroup', '')
        }
      }
    },
    commentField: {
      get: function () {
        return this.$store.getters.commentField
      },
      set: function (v) {
        let commentField = ''
        v ? commentField = v : commentField = ''
        this.$store.dispatch('chgCommentField', commentField)
      }
    },
    valTitleField () {
      let unique = true
      let length = true
      if (this.MXFPcategories()) {
        const findUnique = this.MXFPcategories()
          .find(item => item.title.toLowerCase() === this.titleField.toLowerCase())
        if (findUnique) {
          unique = false
        }
        if (this.getEditItem().title) {
          if (this.getEditItem() && this.titleField.toLowerCase() ===
            this.getEditItem().title.toLowerCase()) {
            unique = true
          }
        }
        this.titleField.length > 2 && this.titleField.length < 31
          ? length = true : length = false
      }
      return {
        length: length,
        unique: unique
      }
    },
    valСommentField () {
      const valСommentField = {}
      let length = true
      this.commentField.length < 100 ? length = true : length = false
      valСommentField.length = length
      return valСommentField
    },
    valStdFPCatGroup () {
      const valStdFPCatGroup = {}
      valStdFPCatGroup.selected = !!this.stdFPCatGroup.id
      return valStdFPCatGroup
    },
    titleFieldErrors () {
      const errors = []
      if (!this.$v.titleField.$dirty) return errors
      !this.$v.titleField.length && errors.push('Не менее 3-х и не более 15-ти символов')
      !this.$v.titleField.unique && errors.push('Наименование уже существует')
      return errors
    },
    commentFieldErrors () {
      const errors = []
      if (!this.$v.commentField.$dirty) return errors
      !this.$v.commentField.length && errors.push('Не более 100 символов')
      return errors
    },
    stdFPCatGroupErrors () {
      const errors = []
      if (!this.$v.stdFPCatGroup.$dirty) return errors
      !this.$v.stdFPCatGroup.selected && errors.push('Выберите категорию в левом меню')
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
    toChgByEditItem () {
      if (this.getEditItem().id) {
        this.$store.dispatch('chgSearchField', this.getEditItem().title)
        this.$store.dispatch('chgCommentField', this.getEditItem().comment)
        let stdFPCatGroup = this.MXFPcatGroups()
          .find(item => item.id === this.getEditItem().parentId)
        if (!stdFPCatGroup) { stdFPCatGroup = {} }
        this.$store.dispatch('chgStdFPCatGroup', stdFPCatGroup)
        this.expenses = this.getEditItem().expenses
        this.entrances = this.getEditItem().entrances
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
          item.title = this.titleField
          item.parentId = this.stdFPCatGroup.id
          item.comment = this.commentField
          item.expenses = this.expenses
          item.entrances = this.entrances
          item.catVisible = true
          this.MXtoCreateFPCategory(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.id = this.getEditItem().id
          item.title = this.titleField
          item.comment = this.commentField
          item.parentId = this.stdFPCatGroup.id
          item.expenses = this.expenses
          item.entrances = this.entrances
          item.catVisible = true
          this.MXtoEditFPCategory(item)
          break
        case 'remove':
          this.$store.dispatch('chgLoading', 'true')
          this.MXtoRemoveFPCategory(this.getEditItem().id)
          break
        default: // cancel
          this.$store.dispatch('chgSearchField', '')
          this.$store.dispatch('chgEditMode', '')
      }
      this.$v.$reset()
      this.expenses = true
      this.entrances = true
      this.$store.dispatch('chgSearchField', '')
      this.$store.dispatch('chgCommentField', '')
      this.$store.dispatch('chgEditMode', '')
      this.$store.dispatch('chgItemMode', 'default')
      this.$store.dispatch('chgEditItem', {})
      this.$store.dispatch('chgStdFPCatGroup', {})
    }
  }
}
</script>

<style scoped>

</style>
