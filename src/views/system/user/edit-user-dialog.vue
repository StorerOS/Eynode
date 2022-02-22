<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="closeDialog"
  >
    <div>
      <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
        <el-form-item label="用户账号：" prop="user_name" maxlength="18">
          <el-input v-model="submitForm.user_name" placeholder="请输入用户账号" maxlength="18" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="用户名称：" prop="user_alias" maxlength="18">
          <el-input v-model="submitForm.user_alias" placeholder="请输入用户名称" maxlength="18" />
        </el-form-item>
        <el-form-item label="用户密码：" prop="password">
          <el-input v-model="submitForm.password" show-password placeholder="请输入用户密码" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="选择角色：" prop="role_name">
          <el-select v-model="submitForm.role_name">
            <el-option v-for="item in roleList" :key="item.id" :label="item.role_name" :value="item.role_name" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述信息：">
          <el-input v-model="submitForm.remark" type="textarea" :rows="4" placeholder="请输入描述信息" maxlength="200" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" :loading="loadingMixin.operation" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editUserFormRules } from './utils'
import { createUser, editUser } from '@/api/system'
import { getRoleList } from '@/api/common'
import { loadingMixin } from '@/mixin'
import md5 from 'js-md5'
import _ from 'lodash'

export default {
  name: 'EditUserDialog',
  mixins: [loadingMixin],
  props: {
    type: {
      type: String,
      validator: function(val) {
        return ['EDIT', 'ADD'].includes(val.toLocaleUpperCase())
      },
      default: 'ADD'
    },
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      submitForm: {},
      roleList: []
    }
  },
  computed: {
    isEdit() {
      return this.type === 'EDIT'
    },
    title() {
      return this.isEdit ? '编辑' : '新建'
    },
    formRules() {
      return editUserFormRules
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
      if (newVal) {
        if (!this.roleList || this.roleList.length <= 0) this.initRoleList()
        this.fillForm(this.info)
      }
    }
  },
  methods: {
    async initRoleList() {
      const queryParams = {
        page_no: 0,
        page_size: 99999
      }
      const { data } = await getRoleList(queryParams)
      this.roleList = data.roles || []
    },
    closeDialog() {
      this.submitForm = {}
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.$emit('update:visible', false)
    },
    async confirm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        const queryParams = {
          ...this.submitForm
        }
        if (this.cloneInitSubmitForm.password !== queryParams.password) {
          queryParams.password = md5(queryParams.password)
        }

        this.$_loadingMixin_start(async() => {
          await (this.isEdit ? editUser : createUser)(queryParams)
          this.$message.success(this.isEdit ? '编辑成功' : '添加成功')
          this.closeDialog()
          this.$emit('confirm')
        }, 'operation')
      })
    },
    fillForm(info) {
      const { user_name, user_alias, role_name, password, remark } = info
      this.submitForm = {
        user_name,
        user_alias,
        role_name,
        password,
        remark
      }
      this.cloneInitSubmitForm = _.cloneDeep(this.submitForm)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
