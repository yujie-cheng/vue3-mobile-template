<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-link to="/">Go to Home</router-link> | 
  <router-link to="/hello">Go to hello</router-link> | 
  <router-link to="/about">Go to About</router-link>
  <button @click="useDynamic">使用动态路由跳转到about</button>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: { },
  methods: {
    useDynamic() {
      this.$router.push('/about')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
