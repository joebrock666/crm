<template>
<div>
  <div class="page-title">
    <h3>{{'Categories'|localize}}</h3>
  </div>
  <section>
    <loader v-if="loading"></loader>
    <div class="row" v-else>
      <category-create @created="addNewCategory"></category-create>
      <category-edit
        :categories="categories"
        @updated="updateCategories"
        :key="categories.length + updateCount"
        v-if="categories.length"
        ></category-edit>
        <p v-else>{{'NoCategories'|localize}}</p>
    </div>
  </section>
</div>
</template>

<script>
import categoryCreate from '@/components/CategoryCreate'
import categoryEdit from '@/components/CategoryEdit'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'categories',
  metaInfo () {
    return {
      title: localizeFilter('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.loading = false
    this.categories = await this.$store.dispatch('fetchCategories')
  },
  components: {
    categoryCreate, categoryEdit
  }
}
</script>
