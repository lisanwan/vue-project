<template>
  <div class="btns">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary" v-if="showChina" @click="goChina"
        >中国地图</el-button
      >
      <el-button type="danger" v-if="!showChina" @click="goChina"
        >返回首页</el-button
      >
      <el-button type="success" @click="outName">store</el-button>
      <el-button type="info" @click="login">登录功能</el-button>
      <el-button type="warning">警告按钮</el-button>
    </el-row>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { login } from '../api/app'
export default {
  data() {
    return {
      showChina: true,
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      }
    }
  },
  methods: {
    goChina() {
      if (this.showChina) {
        this.$router.push('/echarts')
      } else {
        this.$router.push('/')
      }
      this.showChina = !this.showChina
    },
    outName() {
      this.$message.success(this.name)
    },
    async login() {
      this.$message.success('发出请求了')
      const res = await login(this.loginForm)
      console.log(res)
    }
  },
  created() {
    if (this.$route.path === '/echarts') {
      this.showChina = false
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['name'])
  }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
}
</style>
