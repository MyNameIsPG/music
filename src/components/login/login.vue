<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="">
    </div>
    <div class="login-form">
      <div class="login-form-group">
        <i class="fa fa-user-o"></i>
        <input type="text" v-model="form.username" placeholder="请输入账号" >
      </div>
      <div class="login-form-group">
        <i class="fa fa-lock"></i>
        <input type="password" v-model="form.password" placeholder="请输入密码" >
      </div>
      <div class="login-form-btn">
        <button type="button" @click="_login()">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from 'api/index'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    _login () {
      if (this.form.username === '') {
        alert('账号不能为空')
      } else if (this.form.password === '') {
        alert('密码不能为空')
      } else {
        let params = {
          email: this.form.username,
          password: this.form.password
        }
        setTimeout(() => {
          login(params).then((res) => {
            debugger
            if (res.code === ERR_OK) {
              debugger
              this.$router.push({ path: `/player` })
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/stylus/mixin.styl"
.login
  width 100%
  height 100%
  background url('../../../static/image/bg.jpg')
  background-size 100%
  .logo img
    flexCenter()
    margin 0 auto
    padding 60px 0 60px
    width 160px
  .login-form
    padding 10px 50px
    .login-form-group
      position relative
      border-bottom 1px solid #dbdbdb
      margin-bottom 20px
      input
        background transparent
        padding 8px 30px
        box-sizing border-box
        width 100%
        outline none
        color #c2c2c2
      input::-webkit-input-placeholder
        color #c2c2c2
        font-size 16px
      i
        position absolute
        left 0px
        top 6px
        font-size 20px
        color #c2c2c2
    .login-form-btn
      margin-top 30px
      button
        background #fb5858
        border none
        outline none
        border-radius 16px
        padding 8px 10px
        box-sizing border-box
        width 100%
        color #ffffff
        font-size 16px
</style>
