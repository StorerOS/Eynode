<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    class="dialog-container-default"
  >
    <div slot="title" class="dialog-container-title">
      <svg-icon icon-class="ic_dialog_add" />
      <span>{{ `Create new project` }}</span>
    </div>
    <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
      <el-form-item label="Project type:" prop="project_type">
        <el-select v-model="submitForm.project_type">
          <template v-for="item in projectTypeList">
            <el-option v-if="!item.disable" :key="item.value" :label="item.text" :value="item.value" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="Project name:" prop="project_name">
        <el-input v-model="submitForm.project_name" maxlength="18" placeholder="Please enter a project name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="footer-container-btn">
      <el-button class="cancel-btn" @click="closeDialog"><svg-icon icon-class="quxiao" />Cancel</el-button>
      <el-button :loading="loadingMixin.operation" type="primary" @click="confirm"><svg-icon icon-class="ic_dialog_yes" />Sure</el-button>
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
        project_type: 4
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
          this.$message.success('Created successfully')
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
