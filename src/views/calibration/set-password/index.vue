<template>
  <div class="content-container">
    <div class="bg-decoration">
      <svg-icon icon-class="line-decoration-min" />
    </div>
    <div class="content-main-container">
      <div class="content__title">Set new password</div>
      <div class="content__main">
        <el-form ref="ruleForm" :model="form" :rules="formRules" class="form-container" auto-complete="on" label-position="left">
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
            />
          </el-form-item>
          <el-form-item prop="confirm_password">
            <div class="label-container">
              <svg-icon icon-class="password2" />
              <span>CONFIRM PASSWORD</span>
            </div>
            <el-input
              ref="confirmPassword"
              v-model="form.confirm_password"
              type="password"
              name="confirmPassword"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="recoverPassword"
            />
          </el-form-item>
          <el-button type="primary" class="large-special-button operation-btn" :loading="loadingMixin.operation" @click.native.prevent="recoverPassword">CONFIRM</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { recoverPassword } from '@/api/user'
import { validateConfirmPassword } from './utils'
import md5 from 'js-md5'
import { loadingMixin } from '@/mixin'

export default {
  name: 'SetPassword',
  mixins: [loadingMixin],
  data() {
    return {
      form: {}
    }
  },
  computed: {
    formRules() {
      return {
        password: [
          { required: true, validator: validateConfirmPassword.call(this, 'Please enter the password'), trigger: 'blur' }
        ],
        confirm_password: [
          { required: true, validator: validateConfirmPassword.call(this, 'Please enter the confirm password'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    recoverPassword() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return

        const queryParams = {
          email: this.$route.params.email,
          password: md5(this.form.password)
        }
        this.$_loadingMixin_start(async() => {
          await recoverPassword(queryParams)
          this.$message.success('Password recovery succeeded, please log in again')
          this.$router.push('/login')
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

.content-container {
  padding-bottom: 93px;
}
.bg-decoration {
  height: 364px;
}
</style>
