<template>
  <div id="app">
    <v-header title="Commonjs Demo" />
    <Snackbar />
    <div class="container" style="flex: 1" >
      <router-view></router-view>
    </div>
    <v-footer />
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import Snackbar from '@/components/snackbar'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    'v-header': Header,
    'v-footer': Footer,
    Snackbar,
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

#app {
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
