<template>
  <header>
    <span class="title">{{ title }}</span>
    <Search
      :placeholder="'Input a module id to import'"
      v-model="moduleID"
      @enter="importModule" />
  </header>
</template>

<script>
import Search from '@/components/search'
export default {
  data () {
    return {
      moduleID: ''
    }
  },

  props: ['title'],

  methods: {
    importModule () {
      if (this.moduleID !== '') {
        this.$store.dispatch('FETCH_DEP', { id: this.moduleID })
      }
    }
  },

  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 30px;
    background-color: #455A64;
    box-shadow: 0 1px 8px rgba(0,0,0,.3);
    margin-bottom: 10px;
    color: #FFF;
  }

  .title {
    font-size: 30px;
    flex: 1;
  }
</style>
