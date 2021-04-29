<template>
  <main class="app-content">
    <loader v-if="loading"></loader>
    <div class="app-page" v-else-if="record">
      <div>
        <div>
          <div class="breadcrumb-wrap">
            <router-link to="/history" class="breadcrumb">{{'Menu_History'|localize}}</router-link>
            <a class="breadcrumb" @click.prevent>
              {{ record.type === 'income' ? 'Income' : 'Outcome' | localize }}
            </a>
          </div>
          <div class="row">
            <div class="col s12 m6">
              <div class="card" :class="{
                'red': record.type === 'outcome',
                'green': record.type === 'income'
              }">
                <div class="card-content white-text">
                  <p>{{'Description'|localize}}: {{record.description}}</p>
                  <p>{{'Amount'|localize}}: {{record.amount | currency}}</p>
                  <p>{{'Category'|localize}}: {{record.categoryName}}</p>

                  <small>{{ record.date | date('datetime') }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center" v-else>Записи с id {{ $route.params.id }} не найдено</div>
  </main>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'details',
  metaInfo () {
    return {
      title: localizeFilter('Detail_Title')
    }
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>
