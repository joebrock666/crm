<template>
  <main class="app-content">
      <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{ 'ProfileTitle' | localize }}</h3>
      </div>

      <form class="form" @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="description">Имя</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >{{'Message_EnterName'|localize}}</small>
        </div>

        <div class="switch">
          <label>
            English
            <input type="checkbox" v-model="isRuLocale">
            <span class="lever"></span>
            Русский
          </label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
           {{'Update'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import M from 'materialize-css'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from '@/filters/localize.filter'

export default {
  metaInfo () {
    return {
      title: localizeFilter('ProfileTitle')
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.locale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>

<style scope>
.switch {
  margin-bottom: 2rem;
}
</style>
