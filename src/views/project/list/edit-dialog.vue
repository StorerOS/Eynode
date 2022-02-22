<template>
  <el-dialog
    title="编辑项目"
    :visible.sync="visible"
    :before-close="closeDialog"
    class="edit-dialog"
    width="90%"
  >
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <span>基本信息</span>
      </div>
      <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
        <el-form-item label="项目名称：" prop="project_name">
          <el-input v-model="submitForm.project_name" maxlength="18" placeholder="请输入项目名称" />
        </el-form-item>
      </el-form>
      <div class="operation-btns">
        <el-button type="primary" :loading="loadingMixin.edit" @click="editProject">保存</el-button>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <span>KEYS</span>
      </div>
      <div class="key-content">
        <div class="key-content__base">
          <el-row :gutter="20">
            <el-col :span="12">PROJECT ID</el-col>
            <el-col :span="12">
              PROJECT SECRET
              <el-tooltip class="item" effect="dark" placement="top">
                <div slot="content">隐藏您的项目密码。<br>这在您的应用程序中永远不应该是人类可读的。</div>
                <i class="el-icon-warning-outline" />
              </el-tooltip>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              {{ info.project_key }}
              <i class="el-icon-copy-document" @click="copyText(info.project_key)" />
            </el-col>
            <el-col :span="12">
              {{ info.project_secret }}
              <i class="el-icon-copy-document" @click="copyText(info.project_secret)" />
            </el-col>
          </el-row>
        </div>
        <div>ENDPOINTS</div>
        <div v-for="point in info.end_points" :key="point">
          {{ point }}
          <i class="el-icon-copy-document" @click="copyText(point)" />
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <div slot="header">
        <span>删除项目</span>
      </div>
      <div class="tips-content">
        <div>提示：删除后 使用此项目的任何应用程序将无法再访问节点服务平台 api，无法恢复。</div>
        <el-button type="danger" class="float-right" plain :loading="loadingMixin.delete" @click="deleteProject">删除项目</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import { editFormRules } from './utils'
import { editProject, deleteProject } from '@/api/project'
import copy from 'copy-to-clipboard'

export default {
  name: 'EditDialog',
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
      submitForm: {
        project_name: ''
      }
    }
  },
  computed: {
    formRules() {
      return editFormRules
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
      newVal && this.fillForm(this.info)
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
    async editProject() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return

        const queryParams = {
          ...this.submitForm,
          id: this.info.id
        }
        this.$_loadingMixin_start(async() => {
          await editProject(queryParams)
          this.$message.success('编辑成功')
          this.closeDialog()
          this.$emit('confirm')
        }, 'edit')
      })
    },
    async deleteProject() {
      const queryParams = {
        id: this.info.id
      }
      this.$_loadingMixin_confirm('确定要删除该项目吗？', async() => {
        await deleteProject(queryParams)
        this.$message.success('删除成功')
        this.closeDialog()
        this.$emit('confirm')
      }, 'delete')
    },
    copyText(text) {
      copy(text)
      this.$message.success('复制成功')
    },
    fillForm(info) {
      this.$set(this.submitForm, 'project_name', info.project_name)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-dialog {
  ::v-deep .el-dialog {
    min-width: 800px;
    max-width: 1200px;
  }
  .box-card {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .key-content {
    line-height: 1.7;
    &__base {
      margin-bottom: 10px;
    }
  }
  .tips-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-icon-copy-document {
    cursor: pointer;
  }
}
</style>
