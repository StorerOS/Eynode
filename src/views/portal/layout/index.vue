<template>
  <div class="app-wrapper">
    <app-header class="portal-header-container" />
    <div class="portal-main-container">
      <app-main />
    </div>
    <app-footer class="portal-footer-container" />
  </div>
</template>

<script>
import { AppMain, AppHeader, AppFooter } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    .portal-main-container {
      padding-top: 100px;
      z-index: 1;
      flex: 1;
    }
    .portal-header-container {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1999;
    }
    .portal-header-container,
    .portal-footer-container {
      width: 100%;
    }
  }
</style>
