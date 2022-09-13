<template>
  <div class="header">
    <div class="header__operation">
      <div class="header__operation__btn" @click="refresh"><svg-icon icon-class="ic_refresh" /></div>
      <screenfull class="header__operation__btn" />
      <!-- <div class="header__operation__btn">
        <svg-icon icon-class="ic_user" />
        <span>{{ userInfo && userInfo.user_name }}</span>
      </div> -->
      <div class="header__operation__btn ">
        <el-dropdown class="avatar-container" trigger="hover">
          <div class="header__user__wrapper">
            <svg-icon icon-class="ic_user" />
            <span>{{ userInfo && userInfo.user_name }}</span>
          </div>
          <!-- <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="showChangePassword">
              <span style="display:block;">修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu> -->
        </el-dropdown>
      </div>
    </div>
    <div class="header__operation__close" @click="logout">
      <svg-icon icon-class="ic_close" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import { title } from '@/settings'

export default {
  name: 'AppHeader',
  components: {
    Screenfull
  },
  data() {
    return {
      title
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebar'
    ])
  },
  methods: {
    ...mapActions('user', ['updateChangePasswordDialog']),
    showChangePassword() {
      this.updateChangePasswordDialog(true)
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    },
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.header {
  width: 100%;
  padding:15px 0 10px;
  display: flex;
  align-items: center;
  z-index: 99;
  .svg-icon{
    font-size: $headerIconSize;
  }
  // box-shadow: rgba(204, 204, 204, 0.2) 0px 3px 2px;
  &__operation__close{
    width:64px;
    height: $headerHeight;
    text-align: center;
    line-height: $headerHeight;
    background: $headerBackgroundColor;
    margin:0 0 0 10px;
    border-radius: 10px;
  }
  &__operation {
    width: 100%;
    font-size: $fontSizeLarge;
    background:$headerBackgroundColor;
    display: flex;
    justify-content: flex-end;
    padding:0 60px;
    border-radius: 10px;
    &__btn {
      height: $headerHeight;
      display: flex;
      font-size: 16px;
      justify-content: center;
      align-items: center;
      padding: 0px 10px;
      margin: 0px 10px;
      cursor: pointer;
      span{
        margin: 0 0 0 12px;
      }
    }

    :last-of-type {
      margin-right: 0;
    }
  }
  &__user {
    &__wrapper {
      .el-icon-user {
        font-size: $fontSizeLarge;
      }
    }
  }
  .avatar-container {
    height: 100%;
    ::v-deep .header__user__wrapper {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
