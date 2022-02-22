<template>
  <el-dialog
    title="创建新项目"
    :visible.sync="visible"
    :before-close="closeDialog"
  >
    <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
      <el-form-item label="选择项目类型：" prop="project_type">
        <el-select v-model="submitForm.project_type">
          <el-option v-for="item in projectTypeList" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称：" prop="project_name">
        <el-input v-model="submitForm.project_name" maxlength="18" placeholder="请输入项目名称" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button :loading="loadingMixin.operation" type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import { createFormRules } from './utils'
import { projectTypeStatus } from '@/utils/data-const'
import { createProject } from '@/api/project'
import _ from 'lodash'

export default {
  name: 'CreateDialog',
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitForm: {
        project_type: 1
      },
      projectTypeList: projectTypeStatus()
    }
  },
  computed: {
    formRules() {
      return createFormRules
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
    }
  },
  created() {
    this.defaultSubmitForm = _.cloneDeep(this.submitForm)
  },
  methods: {
    closeDialog() {
      this.submitForm = _.cloneDeep(this.defaultSubmitForm)
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
        this.$_loadingMixin_start(async() => {
          await createProject(queryParams)
          this.$message.success('创建成功')
          this.closeDialog()
          this.$emit('confirm')
        }, 'operation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
