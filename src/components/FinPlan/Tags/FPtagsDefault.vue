<template>
  <div>
    <v-card
      flat
    >
      <v-row no-gutters class="flex-wrap">
      <v-col
        cols="4"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-text-field
          v-model="stdFPTagGroup.title"
          class="px-1 py-0"
          style=""
          value=""
          label="Группа тэгов (выберите в левом меню или в списке)"
          :error-messages="stdFPTagGroupErrors"
          @blur="$v.stdFPTagGroup.$touch()"
          outlined
          readonly
          dense
        >
        </v-text-field>
      </v-col>
      <v-col
        cols="1"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-text-field
          ref="titleField"
          v-model="titleField"
          class="py-0 px-1"
          style="min-width: 300px"
          label="Наименование тэга"
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
      </v-col>
        <div>
          <v-btn
            class="ml-1 mt-1"
            outlined
            color="primary"
            @click="button()"
          >
            Создать тэг
          </v-btn>
        </div>
        <div>
          <v-btn
            @click="chgItemMode('FPtagsGroup')"
            class="ml-2 mt-1"
            outlined
            color="green"
          >Создать группу тэгов
          </v-btn>
        </div>
    </v-row>
    </v-card>
  </div>
</template>

<script>
import { eventEmitter } from '@/main'
import { validationMixin } from 'vuelidate'
import FPtags from '@/mixins/FinPlan/FPtags.js'

export default {
  name: 'FPtagsDefault',
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
        return this.valСommentField.length
      }
    },
    stdFPTagGroup: {
      selected: function () {
        return this.valStdFPTagGroup.selected
      }
    }
  },
  created: function () {
    this.toChgByEditItem()
    eventEmitter.$on('toChgByEditItem', () => {
      this.toChgByEditItem()
    })
    eventEmitter.$on('changedStdFPTagGroup', () => {
      this.focusInput()
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
    stdFPTagGroup: {
      get: function () {
        const stdFPTagGroup = this.$store.getters.stdFPTagGroup
        if (!stdFPTagGroup.id) {
          stdFPTagGroup.title = 'Выберите группу тэгов в левом меню'
        }
        return stdFPTagGroup
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
      if (this.MXFPtags()) {
        const findUnique = this.MXFPtags()
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
    valStdFPTagGroup () {
      const valStdFPTagGroup = {}
      valStdFPTagGroup.selected = !!this.stdFPTagGroup.id
      return valStdFPTagGroup
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
    stdFPTagGroupErrors () {
      const errors = []
      if (!this.$v.stdFPTagGroup.$dirty) return errors
      !this.$v.stdFPTagGroup.selected && errors.push('Выберите группу тэгов в левом меню')
      return errors
    }
  },
  methods: {
    focusInput () {
      this.$refs.titleField.focus()
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
        this.$store.dispatch('chgCommentField', this.getEditItem().comment)
        let stdFPCatGroup = this.MXFPtagGroups()
          .find(item => item.id === this.getEditItem().parentId)
        if (!stdFPCatGroup) { stdFPCatGroup = {} }
        this.$store.dispatch('chgStdFPCatGroup', stdFPCatGroup)
        this.expenses = this.getEditItem().expenses
        this.entrances = this.getEditItem().entrances
      } else {
        this.titleField = this.$store.getters.searchField
      }
    },
    chgItemMode (itemMode) {
      this.$store.dispatch('chgItemMode', itemMode)
      this.$store.dispatch('chgEditMode', 'create')
      this.$store.dispatch('chgLeftBarMode')
    },
    button () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const item = {}
      this.$store.dispatch('chgLoading', 'true')
      if (this.$store.getters.editMode === 'edit') {
        item.id = this.getEditItem().id
        item.title = this.titleField
        item.comment = this.commentField
        item.parentId = this.stdFPTagGroup.id
        this.MXtoEditFPCategory(item)
      } else {
        item.title = this.titleField
        item.parentId = this.stdFPTagGroup.id
        item.comment = this.commentField
        this.MXtoCreateFPTag(item)
      }
      this.$v.$reset()
      this.$store.dispatch('chgSearchField', '')
      this.$store.dispatch('chgCommentField', '')
      this.$store.dispatch('chgEditMode', '')
      this.$store.dispatch('chgItemMode', 'default')
      this.$store.dispatch('chgEditItem', {})
      this.$store.dispatch('chgStdFPTagGroup', {})
    }
  }
}
</script>

<style scoped>

</style>
