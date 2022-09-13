<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="sidebar-icon-container__btn" @click="toggleSideBar">
      <div class="bg" />
      <svg-icon :icon-class="sidebar.opened ? 'ic_arrow_left':'ic_arrow_right'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { constantRoutes } from '@/router/index'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      const routers = [...constantRoutes]
      return routers
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-icon-container{
  &__btn{
    .bg{
    position: absolute;
      opacity: 0.1;
      width: 100%;
      height: 100%;
      background: #FFFFFF;
    }
    font-size: 14px;
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 46px;
    text-align: center;
    line-height: 46px;
    .svg-icon{
      margin-right: 0!important;
    }
  }
}
</style>
