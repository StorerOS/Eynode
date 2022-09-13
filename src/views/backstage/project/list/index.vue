<template>
  <div>
    <div class="box-container-default">
      <div class="head-container">
        <div class="head-container__title">Datasheets</div>
        <div class="head-container__btn">
          <el-button type="primary" @click="createProject"><svg-icon icon-class="icon_add" />Create project</el-button>
        </div>
      </div>
      <div class="table-container-default">
        <el-table v-loading="loadingMixin.search" :data="tableData">
          <el-table-column label="Project" align="center">
            <template v-slot:default="{ row }">
              <div class="project-block">
                <div class="project-block__type">
                  {{ projectTypeStatus(row.project_type).sText }}
                </div>
                <div class="project-block__info">
                  <div>{{ row.project_name }}</div>
                  <div>Created in{{ row.created_time }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="State" align="center">
            <template v-slot:default="{ row }">
              <el-tag size="medium" :type="runStatus(row.deleted).type">
                {{ runStatus(row.deleted).text }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Requests" align="center">
            <template v-slot:default="{ row }">
              <div>Total requests: {{ row.request_total }}</div>
              <div>Request today: {{ row.request_today }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Operation" width="200" align="center" class-name="operation-column">
            <template slot-scope="scope">
              <el-button type="text" size="medium" @click="editProject(scope.row)">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  .project-block {
    display: flex;
    &__type {
     width: 47px;
      height: 47px;
      border-radius: 5px;
      margin:2px 0;
      box-shadow: 0  0 5px #ccc;
      overflow: hidden;
      color: $colorPrimary;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
    &__info {
      flex: 1;
    }
  }
</style>
