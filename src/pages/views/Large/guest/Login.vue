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
                  large
                  to="/"
                  v-on="on"
                >На главную
<!--                  <v-icon>mdi-codepen</v-icon>-->
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
                label="Password"
                required
                @input="$v.password.$touch"
                @blur="$v.password.$touch"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="teal"
                   to="/register"
            >Регистрация</v-btn>
            <v-spacer />
            <v-btn
              type="submit"
              color="primary"
              @click="submitHeandler"
            >Войти</v-btn>
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
  name: 'login',
  validations: {
    email: { email, required },
    password: { minLength: minLength(8), maxLength: maxLength(12), required }
  },

  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
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
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/user')
        this.$store.dispatch('changeSnackBar', {
          timeout: 3000,
          text: 'Вы вошли в систему',
          color: 'success'
        })
      } catch (e) {
        // console.log('error')
      }
    }
  }
}
</script>
