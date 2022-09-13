<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration" />
    </div>
    <div class="content-main-container">
      <div class="content__title">Get Started for Free</div>
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
          <el-form-item prop="name">
            <div class="label-container">
              <svg-icon icon-class="email" />
              <span>EMAIL</span>
            </div>
            <el-input
              ref="name"
              v-model="form.name"
              name="name"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>PASSWORD</span>
            </div>
            <el-input
              ref="password"
              v-model="form.password"
              type="password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="login"
            />
          </el-form-item>
          <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="login">SIGN IN</el-button>
          <div class="link-text secondary-text" @click="retrievePassword"><el-link>I've lost my password</el-link></div>
          <div class="link-text primary-text" @click="registerAccount"><el-link type="primary"><svg-icon icon-class="add-user" />Create an account</el-link></div>
        </el-form>
      </div>
    </div>
    <retrieve-password-dialog :visible.sync="retrievePassowrdDialogVisible" />
  </div>
</template>

<script>
import RetrievePasswordDialog from './retrieve-password-dialog.vue'
import { loadingMixin } from '@/mixin'
import md5 from 'js-md5'
import { formRules } from './utils'

export default {
  name: 'Login',
  components: {
    RetrievePasswordDialog
  },
  mixins: [loadingMixin],
  data() {
    return {
      retrievePassowrdDialogVisible: false,
      form: {}
    }
  },
  computed: {
    formRules() {
      return formRules
    }
  },
  methods: {
    retrievePassword() {
      this.retrievePassowrdDialogVisible = true
    },
    registerAccount() {
      this.$router.push('/register')
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return

        const queryParams = {
          ...this.form,
          password: md5(this.form.password)
        }
        this.$_loadingMixin_start(async() => {
          await this.$store.dispatch('user/login', queryParams)
          this.$router.push({ path: this.redirect || '/dashboard' })
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 44px;
}
.link-text {
  text-align: center;
  position: relative;
  .el-link {
    font-size: $fontSizeCeilLarge;
    &::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $backgroundColorLight;
    }
  }
}
.link-text.primary-text {
  margin-top: 100px;
  .el-link {
    &::after {
      background-color: #26C1F7;
    }
    &:hover::after {
      border-color: #51cdf9;
    }
    .svg-icon {
      margin-right: 15px;
    }
  }
}
.secondary-text-container {
  margin-top: 15px;
}
.secondary-text {
  margin-top: 15px;
  * {
    color: $colorTextLight;
  }
}
</style>
