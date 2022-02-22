<template>
  <div class="system-user-management">
    <div>
      <div class="block-title">数据筛选</div>
      <el-form ref="form" :inline="true" :model="form" label-width="120px" class="clearfix">
        <el-row type="flex" justify="space-between">
          <form-item-layout>
            <el-form-item label="账号：">
              <user-input v-model="form.user_name" placeholder="请输入用户名称" />
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
        <div class="block-title">用户列表</div>
        <div class="operation-btns">
          <el-button type="primary" @click="addUser">添加</el-button>
        </div>
        <div class="table__container">
          <el-table v-loading="loadingMixin.search" :data="tableData" border>
            <el-table-column label="用户名称" prop="user_alias" min-width="100" />
            <el-table-column label="账号" prop="user_name" width="160" />
            <el-table-column label="所属角色" prop="role_name" min-width="100" />
            <el-table-column label="状态" min-width="100">
              <template v-slot:default="{ row }">
                <el-tag size="medium" :type="availableStatus(row.state).type">{{ availableStatus(row.state).text }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" width="160">
              <template v-slot:default="{ row }">
                {{ row.created_time }}
              </template>
            </el-table-column>
            <el-table-column label="描述信息" prop="remark" min-width="180" />
            <el-table-column label="操作" width="160" fixed="right" align="center" class-name="operation-column">
              <template v-slot:default="{ row }">
                <el-button type="text" @click="editUser(row)">编辑</el-button>
                <el-button type="text" :loading="row.availableLoading" @click="toggleUser(row)">{{ operactionText(row.state) }}</el-button>
                <el-button type="text" :loading="row.deleteLoading" @click="deleteUser(row)">删除</el-button>
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
    <edit-user-dialog :info="currentOperationInfo" :visible.sync="userDialog.visible" :type="userDialog.type" @confirm="$_paginationMixin_search" />
  </div>
</template>

<script>
import EditUserDialog from './edit-user-dialog'
import FormItemLayout from '@/components/FormItemLayout'
import UserInput from '@/components/UserInput'
import { getUserList, deleteUser, disableUser, enableUser } from '@/api/system'
import { paginationMixin, loadingMixin } from '@/mixin'
import { availableStatus } from '@/utils/data-const'

export default {
  name: 'SystemUserManagement',
  components: {
    EditUserDialog,
    FormItemLayout,
    UserInput
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      form: {},
      userDialog: {
        visible: false,
        type: 'ADD' // ADD or EDIT
      },
      currentOperationInfo: {},
      tableData: []
    }
  },
  computed: {
    operactionText() {
      return (state) => {
        return state === 1 ? '禁用' : '启用'
      }
    },
    availableStatus() {
      return availableStatus
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
        const { data, header } = await getUserList(queryParams)
        this.tableData = data.users || []
        this.paginationMixin.total = header.total || 0
      }, 'search')
    },
    resetForm() {
      this.form = {}
    },
    addUser() {
      this.userDialog.type = 'ADD'
      this.currentOperationInfo = {}
      this.openUserDialog()
    },
    editUser(info) {
      this.userDialog.type = 'EDIT'
      this.currentOperationInfo = info
      this.openUserDialog()
    },
    toggleUser(info) {
      const isEnable = info.state === 1 // 1:启用，2:禁用
      const queryParams = {
        user_name: info.user_name
      }
      const tipText = isEnable ? '确定要禁用该用户吗？' : '确定要启用该用户吗？'
      this.$_loadingMixin_confirm(tipText, async() => {
        this.$set(info, 'availableLoading', true)
        try {
          await (isEnable ? disableUser : enableUser)(queryParams)
          this.$message.success('操作成功')
          this.searchData()
        } finally {
          this.$set(info, 'availableLoading', false)
        }
      })
    },
    deleteUser(info) {
      const queryParams = {
        user_name: info.user_name
      }
      this.$_loadingMixin_confirm('确定要删除该用户吗？', async() => {
        this.$set(info, 'deleteLoading', true)
        try {
          await deleteUser(queryParams)
          this.$message.success('删除成功')
          this.$_paginationMixin_search()
        } finally {
          this.$set(info, 'deleteLoading', false)
        }
      })
    },
    openUserDialog() {
      this.userDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.system-user-management {
}
</style>
