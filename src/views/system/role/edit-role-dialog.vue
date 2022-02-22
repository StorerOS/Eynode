<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="closeDialog"
  >
    <div>
      <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
        <el-form-item label="角色名称：" prop="role_name">
          <el-input v-model="submitForm.role_name" placeholder="请输入角色名称" :disabled="isEdit" />
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
import { editRoleFormRules } from './utils'
import { createRole, editRole } from '@/api/system'
import { loadingMixin } from '@/mixin'

export default {
  name: 'EditRoleDialog',
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
      return editRoleFormRules
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
      if (newVal) {
        this.fillForm(this.info)
      }
    }
  },
  methods: {
    closeDialog() {
      this.submitForm = {}
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.$emit('update:visible', false)
    },
    async confirm() {
      const queryParams = {
        ...this.submitForm
      }
      if (this.isEdit) queryParams.id = this.info.id

      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        this.$_loadingMixin_start(async() => {
          await (this.isEdit ? editRole : createRole)(queryParams)
          this.$message.success(this.isEdit ? '编辑成功' : '添加成功')
          this.closeDialog()
          this.$emit('confirm')
        }, 'operation')
      })
    },
    fillForm(info) {
      const { role_name, remark } = info
      this.submitForm = {
        role_name,
        remark
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
