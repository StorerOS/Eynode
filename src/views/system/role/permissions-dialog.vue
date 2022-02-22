<template>
  <el-dialog
    title="系统权限列表"
    :visible.sync="visible"
    :before-close="closeDialog"
  >
    <div v-loading="loadingMixin.search">
      <el-tree
        ref="tree"
        :data="permissionsList"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :render-content="renderContent"
        @node-expand="handleExpand"
        @check-change="handleCheckChange"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" :loading="loadingMixin.operation" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { roleAuthorization, getAllRoleAuthorizationList } from '@/api/system'
import { loadingMixin } from '@/mixin'
import { findPermissionItem } from './utils'

export default {
  name: 'PermissionsDialog',
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      permissionsList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedList: new Set([])
    }
  },
  watch: {
    async visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
      if (newVal) {
        if (!this.permissionsList || this.permissionsList.length <= 0) {
          await this.initRoleAuthorizationList()
        }
        this.fillPermissions(this.permissionsList, this.info.role)
      }
    }
  },
  methods: {
    async initRoleAuthorizationList() {
      await this.$_loadingMixin_start(async() => {
        const { data } = await getAllRoleAuthorizationList()
        this.permissionsList = data.tree_list || []
        this.fillPermissions(this.permissionsList, this.info.role)
        this.handleExpand()
      }, 'search')
    },
    closeDialog() {
      this.$emit('update:visible', false)
      this.$refs.tree.setCheckedKeys([])
    },
    confirm() {
      const queryParams = {
        role_name: this.info.role_name,
        privilege: [...this.selectedList]
      }

      this.$_loadingMixin_start(async() => {
        await roleAuthorization(queryParams)
        this.$message.success('授权成功')
        this.closeDialog()
        this.$emit('confirm')
      }, 'operation')
    },
    renderContent(h, { data }) {
      let className = ''
      if (!data.children || data.children.length <= 0) {
        className = 'tree-item'
      }
      return (
      // 在需要做横向排列的模块做标记
        <div class={className}>
          {data.label}
        </div>
      )
    },
    changeCss() {
      var treeItem = document.getElementsByClassName('tree-item')
      for (var i = 0; i < treeItem.length; i++) {
        treeItem[i].parentNode.style.cssFloat = 'left'
        treeItem[i].parentNode.style.styleFloat = 'left'
      }
    },
    handleExpand() {
      this.$nextTick(() => {
        this.changeCss()
      })
    },
    fillPermissions(list, permissionsKeyList) {
      if (!permissionsKeyList || permissionsKeyList.length <= 0) return
      const findList = permissionsKeyList.map(key => findPermissionItem(list, key))
      this.$refs.tree.setCheckedNodes(findList)
    },
    handleCheckChange({ children, name }, checked, indeterminate) {
      if (children && children.length > 0 || !name) return
      checked ? this.selectedList.add(name) : this.selectedList.delete(name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

::v-deep .el-tree {
  .el-tree-node__content {
    margin-bottom: 6px;
    background-color: transparent;
    .el-checkbox.is-checked + div {
      color: $colorPrimary;
    }
    & > div:hover {
      background-color: transparent;
      color: $colorPrimaryHover;
    }
  }
}
</style>
