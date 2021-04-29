<template>
  <div>
    <loader v-if="loading"></loader>

    <div class="app-main-layout" v-else>
      <navbar @click="isOpen = !isOpen"></navbar>

      <sidebar v-model="isOpen" :key="locale"></sidebar>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/app/navbar'
import sidebar from '@/components/app/sidebar'

export default {
  data: function () {
    return {
      isOpen: false,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  components: { navbar, sidebar }
}
</script>
