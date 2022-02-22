<!--
 * @Author: yaohongbin
 * @Date: 2021-11-04 18:49:48
 * @LastEditors: yaohongbin
 * @LastEditTime: 2021-12-14 15:29:56
 * @FilePath: \node-gateway-grant\src\components\UserInput\index.vue
* @Description: 用户名称搜索组件
-->

<template>
  <search-input v-bind="$attrs" :request-options="searchOptions" :response-callback="responseCallback" v-on="$listeners">
    <slot />
  </search-input>
</template>

<script>
import SearchInput from '@/components/SearchInput'

export default {
  name: 'UserInput',
  components: {
    SearchInput
  },
  computed: {
    searchOptions() {
      return {
        url: '/platform/list/user',
        method: 'post',
        data: {
          user_name: this.$attrs.value,
          page_no: 0,
          page_size: 0
        }
      }
    }
  },
  methods: {
    responseCallback({ data }) {
      return data.users.map(item => ({
        value: item.user_name,
        name: item.user_name
      }))
    }
  }
}
</script>

<style>

</style>
