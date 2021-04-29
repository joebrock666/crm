<template>
  <main class="app-content">
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>{{'Menu_Planning'|localize}}</h3>
          <h4>{{ info.bill | currency('RUB') }}</h4>
        </div>

        <loader v-if="loading"></loader>

        <p class="center" v-else-if="!categories.length">
          {{'NoCategories'|localize}}.
          <router-link to="/categories">{{'AddFirst'|localize}}</router-link>
        </p>

        <section v-else>
          <div v-for="cat of categories" :key="cat.id">
            <p>
              <strong>{{cat.title}}:</strong>
              {{cat.spend | currency}} {{'Of'|localize}} {{cat.limit | currency}}
            </p>
            <div class="progress" v-tooltip="cat.tooltip">
              <div
                  class="determinate"
                  :class="[cat.progressColor]"
                  :style="{width: cat.progressPercent + '%'}"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import filterCurrency from '@/filters/currency.filter'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'planning',
  metaInfo () {
    return {
      title: localizeFilter('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          const totalSpend = total += +record.amount
          return totalSpend
        }, 0)
      console.log(cat.id)

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${filterCurrency(Math.abs(tooltipValue))}`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })
  }
}
</script>
