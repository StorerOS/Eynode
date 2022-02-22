<template>
  <div class="header">
    <div class="header__home" @click="$router.push('/')">
      <img src="@/assets/logo.png" class="header__logo__image" alt="logo">
      <h3 class="header__title">{{ title }}</h3>
    </div>
    <div class="header__operation">
      <div class="header__operation__btn" @click="refresh"><i class="el-icon-refresh-right" /></div>
      <screenfull class="header__operation__btn" />
      <div class="header__operation__btn header__user">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="header__user__wrapper">
            <i class="el-icon-user" />
            {{ userInfo && userInfo.user_name }}
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item @click.native="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      'userInfo'
    ])
  },
  methods: {
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
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px 20px;
  z-index: 99;
  box-shadow: rgba(204, 204, 204, 0.2) 0px 3px 2px;
  background-color: #ffffff;
  &__home {
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    float: left;
  }
  &__logo {
    height: 34px;
    width: 22px;
    border: 4px solid $colorPrimary;
    &__image {
      width: 30px;
    }
  }
  &__title {
    font-size: $fontSizeLarge;
    font-weight: 700;
    margin-left: 20px;
    color: $colorPrimary;
  }
  &__operation {
    float: right;
    font-size: $fontSizeLarge;
    display: flex;
    &__btn {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 10px;
      margin: 0px 10px;
      cursor: pointer;
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
