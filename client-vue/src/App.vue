<template>
  <div id="app">
    <Navbar msg="Welcome KopiGreen Vue.js App"/>
    <Client/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Client from './components/Client.vue';

export default {
  name: 'app',
  components: {
    Navbar,Client,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
