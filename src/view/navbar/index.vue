<template>
  <div class="navbar">
    <p>重庆市江津区灭火应急救援决策与行动支持系统</p>
    <el-dropdown class="el-dropdown">
      <span class="el-dropdown-link">
        <img class="avatar" :src="avatar"/>
        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    logout () {
      this.$store.dispatch('FedLogOut').then(() => {
        console.log('退出登录')
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
  .navbar
    height 100%
    text-align right
    p
      width 80%
      color white
      float left
      text-align left
      height 100%
      letter-spacing 3px
      font-size 25px
      line-height 60px
    .el-dropdown
      height 60px
      line-height 60px
      color #ffffff
      .el-dropdown-link
        cursor pointer
        .avatar
          width 30px
          height 30px
          display inline-block
          vertical-align top
          margin-top 15px
          border-radius 50%
</style>
