<template>
  <div class="role-management">
    <div>
      <div class="block-title">数据筛选</div>
      <el-form ref="form" :inline="true" :model="form" label-width="120px" class="clearfix">
        <el-row type="flex" justify="space-between">
          <form-item-layout>
            <el-form-item label="角色名称：">
              <role-input v-model="form.role_name" placeholder="请输入角色名称" />
            </el-form-item>
          </form-item-layout>
          <form-item-layout class="single-btn">
            <el-button type="primary" @click="$_paginationMixin_search">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </form-item-layout>
        </el-row>
      </el-form>
    </div>
    <div class="container-block">
      <div class="user-management__table">
        <div class="block-title">角色列表</div>
        <div class="operation-btns">
          <el-button type="primary" @click="addRole">添加</el-button>
        </div>
        <div class="table__container">
          <el-table v-loading="loadingMixin.search" :data="tableData" border>
            <el-table-column label="角色名称" prop="role_name" min-width="100" />
            <el-table-column label="描述信息" prop="remark" min-width="180" />
            <el-table-column label="创建者" prop="create_user" min-width="100" />
            <el-table-column label="创建时间" prop="created_time" width="160" />
            <el-table-column label="操作" width="250" align="center" class-name="operation-column">
              <template v-slot:default="{ row }">
                <el-button type="text" @click="editRole(row)">编辑</el-button>
                <el-button type="text" @click="deleteRole(row)">删除</el-button>
                <el-button type="text" @click="authorizationPermissions(row)">授权权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="table-pagination">
        <el-pagination
          :current-page="paginationMixin.currentPage"
          :page-sizes="paginationMixin.pageSizes"
          :page-size="paginationMixin.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationMixin.total"
          :background="true"
          @size-change="$_paginationMixin_handleSizeChange"
          @current-change="$_paginationMixin_handleCurrentChange"
        />
      </div>
    </div>
    <edit-role-dialog :info="currentOperationInfo" :visible.sync="roleDialog.visible" :type="roleDialog.type" @confirm="$_paginationMixin_search" />
    <permissions-dialog :info="currentOperationInfo" :visible.sync="permissionsDialogVisible" @confirm="$_paginationMixin_search" />
  </div>
</template>

<script>
import RoleInput from '@/components/RoleInput'
import FormItemLayout from '@/components/FormItemLayout'
import EditRoleDialog from './edit-role-dialog'
import permissionsDialog from './permissions-dialog'
import { getRoleList } from '@/api/common'
import { paginationMixin, loadingMixin } from '@/mixin'
import { deleteRole } from '@/api/system'

export default {
  name: 'RoleManagement',
  components: {
    RoleInput,
    FormItemLayout,
    EditRoleDialog,
    permissionsDialog
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      form: {},
      roleDialog: {
        visible: false,
        type: 'ADD' // ADD or EDIT
      },
      permissionsDialogVisible: false,
      currentOperationInfo: {},
      tableData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$_paginationMixin_search()
    },
    async searchData() {
      const queryParams = {
        ...this.form,
        page_no: this.paginationMixin.currentPage - 1,
        page_size: this.paginationMixin.pageSize
      }
      this.$_loadingMixin_start(async() => {
        const { data, header } = await getRoleList(queryParams)
        this.tableData = data.roles || []
        this.paginationMixin.total = header.total || 0
      }, 'search')
    },
    resetForm() {
      this.form = {}
    },
    addRole() {
      this.roleDialog.type = 'ADD'
      this.currentOperationInfo = {}
      this.openUserDialog()
    },
    editRole(info) {
      this.roleDialog.type = 'EDIT'
      this.currentOperationInfo = info
      this.openUserDialog()
    },
    deleteRole(info) {
      const queryParams = {
        role_name: info.role_name
      }
      this.$_loadingMixin_confirm('确定要删除该角色吗？', async() => {
        this.$set(info, 'deleteLoading', true)
        try {
          await deleteRole(queryParams)
          this.$message.success('删除成功')
          this.$_paginationMixin_search()
        } finally {
          this.$set(info, 'deleteLoading', false)
        }
      })
    },
    authorizationPermissions(info) {
      this.currentOperationInfo = info
      this.permissionsDialogVisible = true
    },
    openUserDialog() {
      this.roleDialog.visible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-management {

}
</style>
