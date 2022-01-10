<template>
  <h1 class="about">About 页面</h1>
  <h1 class="about">{{ showData }}</h1>
 <van-button type="primary" @click="test">主要按钮</van-button>
 <van-search v-model="value" placeholder="请输入搜索关键词" />
</template>

<script>
import {getSomething} from './service'
export default {
  name: 'About',
  data () {
    return {
      showData: '初始值',
      value:''
    }
  },
  methods: {
    test () {
      getSomething()
    }
  },
  created() {
    this.$store.commit('setTestData', 'about');
  },
  mounted () {
    console.log(this.showData, 'this.showData');
    this.showData = this.$store.getters.getTestData;
  },
}

</script>

<style scoped lang="less">
  .about {
    color: pink;
    padding: 10px;
    height: 20px;
  }
</style>