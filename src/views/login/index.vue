<template>
  <div class="login-container">
    <div class="login-container__body">
      <div class="login-container__head">
        <img src="@/assets/logo.png" class="login-container__logo" alt="logo">
        <h4 class="login-container__title">{{ title }}</h4>
      </div>
      <div class="login-container__methods">
        <div class="methods__item">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <el-form-item prop="name">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="name"
                v-model="loginForm.name"
                placeholder="请输入用户名称"
                name="name"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入登录密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { title } from '@/settings'

export default {
  name: 'Login',
  data() {
    return {
      title,
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const queryParams = {
            ...this.loginForm,
            password: md5(this.loginForm.password)
          }
          this.$store.dispatch('user/login', queryParams).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

@supports (-webkit-mask: none) and (not (cater-color: $colorTextRegular)) {
  .login-container .el-input input {
    color: $colorTextRegular;
  }
}

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: linear-gradient(180deg, $colorPrimary 50%, #ffffff 50%);
  &__body {
    height: 540px;
    padding: 30px 18px 0;
    display: inline-block;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px rgb(153, 153, 153, .35);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    position: relative;
  }
  &__logo {
    width: 74px;
    margin: 40px auto 0;
  }
  &__title {
    font-size: 26px;
    color: $colorPrimary;
    margin: 40px 0px;
    font-weight: 700;
  }
  &__methods {
    width: 380px;
    min-height: 230px;
    padding: 0px 40px;
    box-sizing: border-box;
  }
  &__footer {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10vh;
    font-size: $fontSizeExtraSmall;
    text-align: center;
    color: $colorTextSecondary;
  }
  &__logged {
    &__title {
      font-size: $fontSizeLarge;
      margin-bottom: 20px;
    }
  }
  .login-form {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $colorTextSecondary;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $colorTextSecondary;
    cursor: pointer;
    user-select: none;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $colorTextRegular;
      height: 47px;
      caret-color: $colorTextRegular;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #ffffff inset !important;
        -webkit-text-fill-color: $colorTextRegular !important;
      }
    }
  }
  .copyright {
    margin-right: 10px;
  }
  /* reset element-ui css */
  .el-form-item {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    color: $colorTextRegular;
  }
}
</style>
