<template>
  <main class="app-content">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>{{'Bill'|localize}}</h3>

          <button class="btn waves-effect waves-light btn-small" @click="refresh">
            <i class="material-icons">refresh</i>
          </button>
        </div>
        <loader v-if="loading"></loader>
        <div class="row" v-else>
          <home-bill
            :rates="currency.rates"
          ></home-bill>
          <home-currency
            :rates="currency.rates"
            :date="currency.date"
          ></home-currency>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'Home',
  metaInfo () {
    return {
      title: localizeFilter('Menu_Bill')
    }
  },
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  components: { HomeCurrency, HomeBill }
}
</script>
