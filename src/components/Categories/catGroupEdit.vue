<template>
  <div>
    {{getEditMode()}}
    {{getEditItem()}}
    {{searchField}}
    <v-card
      flat
    >
      <div class="d-flex justify-start justify-space-between">
        <div>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="searchField"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование группы категорий"
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
              <v-rating
                class="pa-0"
                v-model="rating"
                :length="9"
                hover
                background-color="teal lighten-3"
                color="teal"
                x-large
              ></v-rating>
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
import categories from '@/mixins/categories.js'
export default {
  name: 'catGroupEdit',
  mixins: [validationMixin, categories],
  components: {
  },
  data () {
    return {
      commentField: '',
      rating: 9
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
  created: function () {
    this.toChgByEditItem()
    eventEmitter.$on('toChgByEditItem', () => {
      this.toChgByEditItem()
    })
  },
  computed: {
    searchField: {
      get: function () {
        return this.$store.getters.searchField
      },
      set: function (v) {
        let searchField = ''
        v ? searchField = v : searchField = ''
        this.$store.dispatch('chgSearchField', searchField)
      }
    },
    valСhildTitleField () {
      let unique = true
      const findUnique = this.MXcatGroups()
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
      if (this.searchField) {
        return this.searchField
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
    upload () {
      this.toChgByEditItem()
      return true
    },
    getEditMode () {
      return this.$store.getters.editMode
    },
    getEditItem () {
      return this.$store.getters.editItem
    },
    toChgByEditItem () {
      if (this.getEditItem().id) {
        this.$store.dispatch('chgSearchField', this.getEditItem().title)
        this.commentField = this.getEditItem().comment
        this.rating = this.getEditItem().rating
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
          item.rating = this.rating
          this.MXtoCreateCatGroup(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.id = this.getEditItem().id
          item.title = this.searchField
          item.comment = this.childCommentField
          item.rating = this.rating
          this.MXtoEditCatGroup(item)
          break
        case 'remove':
          this.$store.dispatch('chgLoading', 'true')
          this.MXtoRemoveCatGroup(this.getEditItem().id)
          break
        default: // cancel
          break
      }
      this.$store.dispatch('chgItemMode', 'default')
      this.$store.dispatch('chgSearchField', '')
      this.$store.dispatch('chgEditMode', '')
      this.$store.dispatch('chgEditItem', {})
      this.commentField = ''
      this.rating = 1
      this.$v.$reset()
    }
  }
}
</script>

<style scoped>

</style>
