<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Вход</v-toolbar-title>
                <v-spacer />

                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://vuetifyjs.com/ru/"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                @submit.prevent="submitHeandler"
                ref="form"
                lazy-validation
                >
                  <v-text-field
                    v-model.trim="name"
                    :error-messages="nameErrors"
                    label="Введите имя"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model.trim="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch"
                    @blur="$v.email.$touch"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                  />

                  <v-text-field
                    v-model.trim="password"
                    :error-messages="passwordErrors"
                    label="Введите пароль"
                    required
                    @input="$v.password.$touch"
                    @blur="$v.password.$touch"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />

                  <v-checkbox
                    v-model="checkbox"
                    :error-messages="checkboxErrors"
                    label="Do you agree?"
                    required
                    @change="$v.checkbox.$touch()"
                    @blur="$v.checkbox.$touch()"
                  >
                    <template v-slot:label>
                      <div>
                        I agree that
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <a
                              target="_blank"
                              href="http://vuetifyjs.com"
                              @click= "!checkbox"
                              v-on="on"
                            >
                              Vuetify
                            </a>
                          </template>
                          Opens in new window
                        </v-tooltip>
                        is awesome
                      </div>
                    </template>
                  </v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="teal"
                to="/login"
                >Войти
                </v-btn>
                <v-spacer />
                <v-btn color="primary"
                @click="submitHeandler"
                >Создать учетную запись</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email, required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  name: 'registr',
  validations: {
    name: { required },
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    checkbox: false
  }),
  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('Необходимо согласиться с правилами')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Обязательное поле')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Введите E-mail')
      !this.$v.email.required && errors.push('Обязательное поле')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Обязательное поле')
      !this.$v.password.minLength && errors.push('Пароль должен быть не менее ' + this.$v.password.$params.minLength.min + ' символов, cейчас: ' + this.password.length)
      !this.$v.password.maxLength && errors.push('Пароль должен быть не более ' + this.$v.password.$params.maxLength.max + ' символов, cейчас: ' + this.password.length)
      return errors
    }
  },
  methods: {
    async submitHeandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/client')
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
</script>
