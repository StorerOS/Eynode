<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    class="dialog-container-default"
  >
    <div slot="title" class="dialog-container-title">
      <svg-icon icon-class="ic_dialog_edit" />
      <span>{{ `Edit item` }}</span>
    </div>
    <div class="card-container-box">
      <div class="box-title">Basic Information</div>
      <el-form ref="ruleForm" :rules="formRules" :model="submitForm" label-width="120px">
        <el-form-item label="Project name:" prop="project_name">
          <div class="flex_box">
            <el-input v-model="submitForm.project_name" maxlength="18" placeholder="Please enter a project name" />
            <el-button type="primary" :loading="loadingMixin.edit" @click="editProject">Save</el-button></div>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-container-box">
      <div class="box-title">KEYS</div>
      <div class="key-content">
        <el-row :gutter="20">
          <el-col :span="12">PROJECT ID</el-col>
          <el-col :span="12">
            PROJECT SECRET
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">Hide your project password.<br>This should never be human readable in your application.</div>
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
        <div class="box-title">ENDPOINTS</div>
        <div v-for="point in info.end_points" :key="point">
          {{ point }}
          <i class="el-icon-copy-document" @click="copyText(point)" />
        </div>
      </div>
    </div>
    <div class="card-container-box">
      <div class="box-title">Delete item</div>
      <div class="flex_box">
        <div>Tip: After deletion, any application using this project will no longer be able to access the api of the storage node service platform and cannot be restored.</div>
        <el-button type="danger" class="float-right" plain :loading="loadingMixin.delete" @click="deleteProject">delete item</el-button>
      </div>
    </div>
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
          this.$message.success('Edited successfully')
          this.closeDialog()
          this.$emit('confirm')
        }, 'edit')
      })
    },
    async deleteProject() {
      const queryParams = {
        id: this.info.id
      }
      this.$_loadingMixin_confirm('Are you sure you want to delete this item?', async() => {
        await deleteProject(queryParams)
        this.$message.success('Successfully deleted')
        this.closeDialog()
        this.$emit('confirm')
      }, 'delete')
    },
    copyText(text) {
      copy(text)
      this.$message.success('Copy successfully')
    },
    fillForm(info) {
      this.$set(this.submitForm, 'project_name', info.project_name)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-container-box{
  border-bottom: 1px solid rgba(0, 119, 254, 0.1);
  padding:0 0 30px;
  .box-title{
    font-size: 14px;
    font-weight: bold;
    margin: 20px 0;
  }
  &:last-child{
    border-bottom: 0px solid rgba(0, 119, 254, 0.3);
  }
}
.key-content{
  line-height: 20px;
}
.flex_box{
  display: flex;
}
.el-button{
  width: 123px;
  height: 40px;
  margin:0 15px;
}
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
