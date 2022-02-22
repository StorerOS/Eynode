<template>
  <div class="project-list">
    <div class="container-block">
      <div class="block-title">数据列表</div>
      <div class="operation-btns">
        <el-button type="primary" @click="createProject">创建项目</el-button>
      </div>
      <div class="table__container">
        <el-table v-loading="loadingMixin.search" :data="tableData">
          <el-table-column label="项目" min-width="220">
            <template v-slot:default="{ row }">
              <div class="project-block">
                <div class="project-block__type">
                  {{ projectTypeStatus(row.project_type).text | interceptionText }}
                </div>
                <div class="project-block__info">
                  <div>{{ row.project_name }}</div>
                  <div>创建于{{ row.created_time }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="160">
            <template v-slot:default="{ row }">
              <el-tag size="medium" :type="runStatus(row.deleted).type">
                {{ runStatus(row.deleted).text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="请求数" min-width="140">
            <template v-slot:default="{ row }">
              <div>总请求：{{ row.request_total }}</div>
              <div>今日请求：{{ row.request_today }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center" class-name="operation-column">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editProject(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <create-dialog :visible.sync="createDialogVisible" @confirm="$_paginationMixin_search" />
    <edit-dialog :visible.sync="editDialogVisible" :info="currentOperationInfo" @confirm="$_paginationMixin_search" />
  </div>
</template>

<script>
import { paginationMixin, loadingMixin } from '@/mixin'
import CreateDialog from './create-dialog'
import EditDialog from './edit-dialog'
import { runStatus, projectTypeStatus } from '@/utils/data-const'
import { getProjectList } from '@/api/project'

export default {
  name: 'ProjectList',
  components: {
    CreateDialog,
    EditDialog
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      createDialogVisible: false,
      editDialogVisible: false,
      tableData: [],
      currentOperationInfo: {}
    }
  },
  computed: {
    runStatus() {
      return runStatus
    },
    projectTypeStatus() {
      return projectTypeStatus
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
        page_no: this.paginationMixin.currentPage - 1,
        page_size: this.paginationMixin.pageSize
      }
      this.$_loadingMixin_start(async() => {
        const { data, header } = await getProjectList(queryParams)
        this.tableData = data.list || []
        this.paginationMixin.total = header.total || 0
      }, 'search')
    },
    createProject() {
      this.createDialogVisible = true
    },
    editProject(info) {
      this.currentOperationInfo = info
      this.editDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  .project-block {
    display: flex;
    &__type {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background-color: $backgroundColorLowLight;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    &__info {
      flex: 1;
    }
  }
}
</style>
