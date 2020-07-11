<template>
  <div>
    <v-card
      flat
    >
      <div class="d-flex justify-start justify-space-between">
        <div v-if="getEditMode() === 'remove'" class="d-flex justify-center flex-wrap">
          <div><h1>Вы действительно хотите удалить группу тэгов?</h1></div>

          <h2>Это приведет к удалению всех тэгов в группе.</h2>
        </div>
        <div v-else>
          <div class="d-flex justify-space-between">
            <div>
              <v-text-field
                v-model="titleField"
                class="pa-1"
                style="min-width: 400px"
                label="Наименование группы тэгов"
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
        </div>
        <div class="d-flex" >
          <div class="d-flex justify-space-around flex-column align-center ">
            <div v-if="getEditMode() === 'edit'">
              <v-btn
                @click="chgItemMode('FPtagsGroup')"
                class="mx-2"
                outlined
                color="red"
              >Удалить
              </v-btn>
            </div>
            <div v-if="getEditMode() === 'remove'">
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
            <div v-if="getEditMode() !== 'remove'">
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
import FPtags from '@/mixins/FinPlan/FPtags.js'
export default {
  name: 'tagsGroupEdit',
  mixins: [validationMixin, FPtags],
  components: {
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
        return this.valCommentField.length
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
    rating: {
      get: function () {
        return this.$store.getters.rating
      },
      set: function (rating) {
        this.$store.dispatch('chgRating', rating)
      }
    },
    valTitleField () {
      let unique = true
      const findUnique = this.MXFPtagGroups()
        .find(item => item.title.toLowerCase() === this.titleField.toLowerCase())
      if (findUnique) { unique = false }
      if (this.getEditItem().title) {
        if (this.getEditItem() && this.titleField.toLowerCase() ===
            this.getEditItem().title.toLowerCase()) {
          unique = true
        }
      }
      let length = true
      this.titleField.length > 2 && this.titleField.length < 31
        ? length = true : length = false
      return {
        length: length,
        unique: unique
      }
    },
    valCommentField () {
      const valCommentField = {}
      let length = true
      this.commentField.length < 100 ? length = true : length = false
      valCommentField.length = length
      return valCommentField
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
    }
  },
  methods: {
    getEditMode () {
      return this.$store.getters.editMode
    },
    getEditItem () {
      return this.$store.getters.editItem
    },
    chgItemMode (itemMode) {
      this.$store.dispatch('chgItemMode', itemMode)
      this.$store.dispatch('chgEditMode', 'remove')
      this.$store.dispatch('chgLeftBarMode')
    },
    toChgByEditItem () {
      if (this.getEditItem().id) {
        this.$store.dispatch('chgSearchField', this.getEditItem().title)
        this.$store.dispatch('chgCommentField', this.getEditItem().comment)
        this.$store.dispatch('chgRating', this.getEditItem().rating)
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
          item.comment = this.commentField
          item.rating = this.rating
          item.visible = true
          this.MXtoCreateFPTagGroup(item)
          break
        case 'edit':
          if (this.$v.$invalid) {
            this.$v.$touch()
            return
          }
          item.id = this.getEditItem().id
          item.title = this.titleField
          item.comment = this.commentField
          item.rating = this.rating
          item.visible = true
          this.MXtoEditFPtagGroup(item)
          break
        case 'remove':
          this.$store.dispatch('chgLoading', 'true')
          this.MXtoRemoveFPTagGroup(this.getEditItem().id)
          break
        default: // cancel
          break
      }
      this.$v.$reset()
      this.$store.dispatch('chgLoading', 'false')
      this.$store.dispatch('chgSearchField', '')
      this.$store.dispatch('chgCommentField', '')
      this.$store.dispatch('chgRating', 1)
      this.$store.dispatch('chgItemMode', 'default')
      this.$store.dispatch('chgEditMode', '')
      this.$store.dispatch('chgEditItem', {})
      this.$store.dispatch('chgStdFPTagGroup', {})
    }
  }
}
</script>

<style scoped>

</style>
