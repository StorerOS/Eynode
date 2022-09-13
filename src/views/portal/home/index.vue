<template>
  <div class="home-container">
    <div class="home-decoration">
      <svg-icon icon-class="line-decoration2" />
    </div>
    <div class="main-layout-container">
      <img src="@/assets/grid_bg.png" alt="layout background" class="layout-bg">
      <div class="layout-main">
        <div class="main-decoration" />
        <div class="main-content">
          <div class="main-content__title">Eynode</div>
          <div class="main-content__description">Provide developers with API access services for a variety of mainstream blockchain networks.</div>
        </div>
      </div>
      <div class="total-container">
        <div v-loading="loadingMixin.total" class="total-info">
          <div class="total__item">
            <div class="total__item__title">{{ requestInfo.total_requests || 0 }}</div>
            <div class="total__item__text">Total requests</div>
          </div>
          <div class="total__item">
            <div class="total__item__title">{{ requestInfo.per_second || 0 }}</div>
            <div class="total__item__text">Supported requests per second</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section1">
      <div class="section-container">
        <div class="section-block">
          <div class="content-title">Why choose us</div>
          <div class="content-container">
            <el-row :gutter="30">
              <el-col :sm="12" class="content__item">
                <div class="content__item__title">Build it yourself:</div>
                <div class="content__item__main">
                  <p>1. Space: Blockchain is a distributed ledger, and a full node means that developers need a complete copy of the ledger. Such as Ethereum, the data is about 670GB, even the fast sync mode requires 120GB.</p>
                  <p>2. Time-consuming: It may take several days to synchronize the Ethereum mainnet data for the first time.</p>
                  <p>3. Security: For the security of nodes, developers need some network security skills to protect nodes.</p>
                </div>
              </el-col>
              <el-col :sm="12" class="content__item">
                <div class="content__item__title">Eynode:</div>
                <div class="content__item__main">
                  <p>1. Space: Eynode provides the corresponding node server, and developers can directly call the interface.</p>
                  <p>2. Time-consuming: At present, Eynode supports Near, Ethereum, IPFS, and Filecoin nodes, and no developer initialization is required.</p>
                  <p>3. Security: Eynode has rich experience in dealing with network risks and provides expert-level security services.</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="section-block">
          <div class="content-title">Our service</div>
          <div class="block-container content-container">
            <el-row :gutter="100">
              <el-col :md="8" class="block-item">
                <div class="block-item__decoration"><div class="round"><svg-icon icon-class="facilities" /></div></div>
                <div class="block-item__content">
                  Supported complete infrastructure
                </div>
              </el-col>
              <el-col :md="8" class="block-item">
                <div class="block-item__decoration"><div class="round"><svg-icon icon-class="network" /></div></div>
                <div class="block-item__content">
                  Provide a stable and secure network
                </div>
              </el-col>
              <el-col :md="8" class="block-item">
                <div class="block-item__decoration"><div class="round"><svg-icon icon-class="cloud" /></div></div>
                <div class="block-item__content">
                  Provides instant access to the blockchain network
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="section2">
      <div class="section-container">
        <div class="content-title">Powerful developer tools</div>
        <div class="content-container">
          <el-row type="flex">
            <el-col :sm="10" class="content__text">
              <div>Your time as a developer is invaluable. We are committed to providing you with the most convenient service, and we will handle the complicated matters.</div>
            </el-col>
            <el-col :sm="14" class="content__code">
              <svg-icon icon-class="copy" class="btn_icon" @click="handleCopyCode" />
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="Filecoin" name="filecoin">
                  <div v-highlight="highlightConfig" class="tabs__content">
                    <pre>
                      <code class="code-hl">{{ codeLanguageMap.filecoin }}</code>
                    </pre>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Ethereum" name="eth">
                  <div v-highlight="highlightConfig" class="tabs__content">
                    <pre>
                      <code class="code-hl">{{ codeLanguageMap.eth }}</code>
                    </pre>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="NEAR" name="near">
                  <div v-highlight="highlightConfig" class="tabs__content">
                    <pre>
                      <code class="code-hl">{{ codeLanguageMap.near }}</code>
                    </pre>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="IPFS" name="ipfs">
                  <div v-highlight="highlightConfig" class="tabs__content">
                    <pre>
                      <code class="code-hl">{{ codeLanguageMap.ipfs }}</code>
                    </pre>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="section3">
      <div class="bg-decoration" />
      <div class="section-container">
        <div class="content-container">
          <div class="content-item content-item1">
            <div class="content-item__title">Built for developers</div>
            <div class="content-item__container">
              <div>Provides you with a standard API interface and guarantees at least 99.9% uptime.</div>
              <el-button class="plain-btn" @click="toDocs">Documentation</el-button>
            </div>
          </div>
          <div class="content-item content-item2">
            <div class="content-item__title">Simple to use</div>
            <div class="content-item__container">
              <div>
                <p>First step</p>
                <p>Create a Eynode account and create your new project</p>
              </div>
              <div>
                <p>Second step</p>
                <p>Call the endpoint in your project.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { codeLanguageMap } from './utils'
import { getHostEnv } from '@/utils/index'
import { docsHostMap } from '@/utils/data-const'
import { loadingMixin } from '@/mixin'
import { getRequestTotalData } from '@/api/user'
import copy from 'copy-to-clipboard'

export default {
  name: 'Home',
  mixins: [loadingMixin],
  data() {
    return {
      activeName: 'eth',
      isShowCode: true,
      requestInfo: {},
      codeLanguageMap
    }
  },
  computed: {
    highlightConfig() {
      return { }
    },
    docsHostURL() {
      return docsHostMap[getHostEnv()]
    }
  },
  created() {
    this.getTotalInfo()
  },
  methods: {
    async getTotalInfo() {
      this.$_loadingMixin_start(async() => {
        const { data } = await getRequestTotalData()
        this.requestInfo = data || {}
      }, 'total')
    },
    toDocs() {
      window.open(this.docsHostURL)
    },
    handleCopyCode() {
      const { codeLanguageMap, activeName } = this
      copy(codeLanguageMap[activeName])
      this.$message.success('Copy successfully')
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  position: relative;
  overflow: hidden;
}
.home-decoration {
  width: 1724px;
  height: 4361px;
  position: absolute;
  top: 352px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 88;
  .svg-icon {
    width: 100%;
    height: 100%;
  }
}
.main-layout-container {
  position: relative;
  min-height: calc(900px - 100px);
  z-index: 99;
}
.layout-bg {
  object-fit: cover;
  min-height: 900px;
  width: 100%;
  position: absolute;
  left: 0;
  top: -100px;
  z-index: -1;
}
.main-decoration {
  width: 561px;
  height: 583px;
  background: 0px 0px url("~@/assets/home_main_decoration.png") transparent no-repeat;
  background-size: cover;
  position: absolute;
  top: 80px;
  right: 14.6875%;
  z-index: -1;
}
.main-content {
  @include boldFontFamily;
  padding-top: 240px;
  margin-left: 18.22916%;
  color: #ffffff;
  max-width: 770px;
  &__title {
    font-size: 86px;
  }
  &__description {
    margin-top: 12px;
    font-size: 32px;
    line-height: 44px;
  }
}
.total {
  &-container {
    padding: 0 10px;
    position: absolute;
    left: 0;
    right: 0;
    max-width: 1065px;
    margin: 0 auto;
    bottom: 40px;
  }
  &-info {
    @include HeavyFontFamily;
    padding-top: 39px;
    padding-bottom: 42px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    border-radius: $borderRadiusTopSmall;
    background-color: #ffffff;
    box-shadow: 0px 3px 12px 1px rgba(52, 208, 255, 0.8);
    color: $colorTextPrimary;
    position: relative;
    transform: translate3d(0, 50%, 0);
  }
  &__item {
    max-width: 205px;
    text-align: center;
    &__title {
      font-size: 50px;
      line-height: 56px;
    }
    &__text {
      @include font-size-ceil-large;
      margin-top: 37px;
    }
  }
}
.section1, .section2, .section3 {
  .section-container {
    position: relative;
    z-index: 99;
  }
}
.section1 {
  padding-top: 328px;
  padding-bottom: 30px;
  position: relative;
  color: $colorTextPrimary;
  margin-bottom: 395px;
  &::before {
    content: '';
    width: 748px;
    height: 748px;
    background: 0px 0px url("~@/assets/round_decoration.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    left: -124px;
    top: 198px;
  }
  &::after {
    content: '';
    width: 100%;
    height: 395px;
    background: 0px 0px url("~@/assets/curves.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    bottom: -1px;
    left: 0;
    transform: translate3d(0, 100%, 0);
  }
  .section-block {
    margin-bottom: 152px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .content {
    &-title {
      @include font-size-very-large;
      @include HeavyFontFamily;
      text-align: center;
    }
    &-container {
      max-width: 1258px;
      margin: 84px auto 0;
    }
    &__item {
      margin-bottom: 20px;
      &__title {
        @include font-size-ceil-large;
        @include HeavyFontFamily;
      }
      &__main {
        @include font-size-ceil-very-large;
        @include mediumFontFamily;
        line-height: 32px;
        margin-top: 32px;
        p {
          margin-bottom: 14px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .block {
    &-container {
      display: flex;
      justify-content: center;
    }
    &-item {
      position: relative;
      &__decoration, &__content {
        &::before {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          border: 1px solid $borderColorPrimary;
          background-color: $backgroundColorPrimary;
        }
      }
      &__decoration {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        &::before {
          border-radius: 50%;
          top: -8px;
          right: -12px;
          z-index: 1;
        }
        .round {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid $borderColorPrimary;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffffff;
          position: absolute;
          z-index: 2;
        }
        .svg-icon {
          font-size: 40px;
          position: relative;
        }
      }
      &__content {
        @include font-size-ceil-very-large;
        @include mediumFontFamily;
        font-size: $colorTextPrimary;
        padding: 63px 10px 20px;
        text-align: center;
        border: 1px solid $borderColorPrimary;
        border-radius: $borderRadiusSpecialSmall;
        background-color: #ffffff;
        position: relative;
        margin: 62px auto 20px;
        &::before {
          top: -9px;
          right: -11px;
          z-index: -1;
        }
      }
    }
  }
}
.section2 {
  padding-bottom: 203px;
  position: relative;
  background-color: #000000;
  &::before {
    content: '';
    width: 345px;
    height: 317px;
    position: absolute;
    top: -251px;
    right: -75px;
    background: 0px 0px url("~@/assets/container_decoration2.png") transparent no-repeat;
    background-size: cover;
    z-index: 1;
  }
  &::after {
    content: '';
    width: 355px;
    height: 314px;
    position: absolute;
    left: 239px;
    top: 161px;
    background: 0px 0px url("~@/assets/container_decoration3.png") transparent no-repeat;
    background-size: cover;
    z-index: 1;
  }
  .content {
    &-title,&-container {
      position: relative;
      z-index: 2;
    }
    &-title {
      @include font-size-very-large;
      @include HeavyFontFamily;
      text-align: center;
      color: #ffffff;
    }
    &-container {
      max-width: 1260px;
      margin: 80px auto 0;
    }
    &__text {
      @include font-size-ceil-large;
      @include mediumFontFamily;
      line-height: 40px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
    &__code {
      padding-left: 30px;
      &:hover{
        .btn_icon{
          display: block;
        }
      }
      .btn_icon{
        cursor:pointer;
        display: none;
        position: absolute;
        top: 60px;
        right: 40px;
        z-index: 9;
        font-size: 20px;
        opacity: .5;
      }
      ::v-deep .el-tabs {

        .el-tabs__header {
          margin-bottom: 0;
          border-bottom: none;
          .el-tabs__nav-wrap, .el-tabs__nav-scroll {
            overflow: visible;
          }
          .el-tabs__nav {
            border: none;
          }
          .el-tabs__item {
            @include mediumFontFamily;
            font-size:  $fontSizeLarge;
            color: #538098;
            border: none;
            background: rgba(0, 54, 90, 0.5);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            // box-shadow: 0px 3px 12px 1px #008EFF, inset 0px 3px 6px 1px rgba(5, 132, 198, 0.7);
            &.is-active {
              color: #ffffff;
                position: relative;
                background: #004777;
              &::after{
                content:'';
                width: 0;
                 width: 0;
                 height: 0;
                 border: 20px solid transparent;
                 border-bottom: 40px solid #004777;
                 position: absolute;
                 right: -18px;
                 z-index: 999;
                 bottom: 0;
              }
            }
          }
        }
        .el-tabs__content {
          overflow: visible;
          padding-top: 40px;
          /* 设置滚动条的样式 */
          ::-webkit-scrollbar{
            width:9px;
            height: 9px;
          }
          /* 滚动槽 */
          ::-webkit-scrollbar-track {
            background: rgba(0, 41, 62, 0.5);
            border-radius:0px;
          }
          /* 滚动条滑块 */
          ::-webkit-scrollbar-thumb {
            border-radius:10px;
            // background:rgba(0,0,0,0.1);
          }
          ::-webkit-scrollbar-thumb{
            background:rgba(0, 71, 108, 1);
          }
          ::-webkit-scrollbar-corner {
            background: rgba(0, 41, 62, 0.5);
          }
        }
      }
      .tabs__content {
        height: 563px;
        overflow: scroll;
        @include mediumFontFamily;
        font-size: $fontSizeMedium;
        padding: 25px 17px 15px 26 px;
        width: 100%;
        // max-width: 556px;
        color: #ffffff;
        background: rgba(0, 0, 0, 0.53);
        border-radius: 0px 5px 5px 5px;
        // box-shadow: 0px 3px 12px 1px rgba(0, 111, 206, 0.98), inset 0px 3px 6px 1px rgba(0, 126, 191, 0.7);
        overflow: auto;
        border: 8px solid #004777;
      }
    }
  }
}
.section3 {
  padding: 40px 0 234px;
  position: relative;
  &::before {
    content: '';
    width: 416px;
    height: 392px;
    background: 0px 0px url("~@/assets/container_decoration5.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    top: -40px;
    right: 269px;
    z-index: 1;
  }
  &::after {
    content: '';
    width: 341px;
    height: 341px;
    background: 0px 0px url("~@/assets/container_decoration4.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 310px;
    left: 174px;
    z-index: 1;
  }
  .bg-decoration {
    width: 100%;
    height: 1072px;
    background: 0px 0px url("~@/assets/curves2.png") transparent no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  .content {
    &-container {
      @include font-size-ceil-very-large;
      @include mediumFontFamily;
      max-width: 1000px;
      padding: 0 10px;
      margin: 0 auto;
      color: $colorTextPrimary;
      position: relative;
      z-index: 1;
    }
    &-item {
      &__title {
        @include font-size-very-large;
        @include HeavyFontFamily;
      }
      &__container {
        padding-top: 61px;
      }
    }
    &-item1 {
      color: #ffffff;
      max-width: 76%;
      margin: 0 0 0 auto;
      &__title {
        color: #ffffff;
      }
      .plain-btn {
        margin-top: 40px;
      }
    }
    &-item2 {
      margin-top: 272px;
      .content-item__container > div {
        margin-bottom: 57px;
        &:last-of-type {
          margin-bottom: 0;
        }
        & p {
          margin-bottom: 5px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
::v-deep .hljs {
  .gradual {
    width: 100%;
    animation: width-gradual 5s steps(120);
    overflow: hidden;
  }
  .spotlight-effects {
   animation: spotlight 1s infinite;
 }
}
@keyframes width-gradual {
  0% {
    width: 0;
  }
}

@keyframes spotlight {
  100% {
    opacity: 0;
  }
}
</style>
