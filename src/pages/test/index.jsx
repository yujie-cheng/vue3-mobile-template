import { defineComponent, reactive, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import QuestionPackageDetail from './drawer/QuestionPackageDetail'
import { getList, updataQuestionBag } from './serve'
import './index.scss'

const QuestionPackageList = defineComponent({
  setup() {
    const drawerTitle = reactive({ value: '' })
    const initFormInline = { type: '', questionName: '', questionNum: '', currentPage: 1, pageSize: 30 }
    const formInline = reactive({ ...initFormInline })
    const state = reactive({
      tableData: [],
      loading: false,
      drawerShow: false,
      isEdit: false,
      isReadonly: false,
    })

    const getTableList = (params = {}) => {
      state.loading = true
      getList(params)
        .then((res) => {
          if (res.code === 0) {
            state.tableData = res.data
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          state.loading = false
        })
    }

    onMounted(() => {
      getTableList()
    })

    const deleteItem = (data) => {
      ElMessageBox.confirm('此操作将永久删除该模版, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          updataQuestionBag({ guid: `${data.guid}`, isDelete: 1 }).then((res) => {
            if (res.code === 0) {
              ElMessage.success({
                message: '删除成功',
                type: 'success',
              })
              search()
            }
          })
        })
        .catch(() => {})
    }

    const search = () => {
      getTableList(formInline)
    }

    const reset = () => {
      formInline.bagType = ''
      formInline.bagName = ''
      formInline.bagNum = ''
      getTableList({})
    }

    const handleNewBag = () => {
      drawerTitle.value = '新建问题包'
      state.isEdit = false
      state.isReadonly = false
      state.drawerShow = true
    }

    const editDetail = (data) => {
      drawerTitle.value = '编辑问题包'
      state.detailData = data
      state.isReadonly = false
      state.isEdit = true
      state.drawerShow = true
    }

    const showDetail = (data) => {
      drawerTitle.value = '问题包详情'
      state.detailData = data
      state.isReadonly = true
      state.drawerShow = true
    }

    const bagNameSlots = {
      default: (scope) => {
        return (
          <span>
            <el-button onClick={() => showDetail(scope.row)} type="text" size="small">
              {scope.row.bagName}
            </el-button>
          </span>
        )
      },
    }

    const actionSlots = {
      default: (scope) => {
        return (
          <div>
            {/* <el-button type="primary" onClick={() => copyUrl(scope.row)} type="text">
              URL
            </el-button> */}
            <el-button type="primary" onClick={() => editDetail(scope.row)} type="text">
              编辑
            </el-button>
            <el-button type="danger" onClick={() => deleteItem(scope.row)} type="text">
              删除
            </el-button>
          </div>
        )
      },
    }

    const bagTypeSlots = {
      default: (scope) => {
        if (scope.row.bagType === 1) {
          return '考试'
        } else if (scope.row.bagType === 2) {
          return '问卷'
        }
        return ''
      },
    }

    const bagTypeList = [
      { label: '考试', value: 1 },
      { label: '问卷', value: 2 },
    ]

    const closeDrawer = (reloadData = false) => {
      state.drawerShow = false
      if (reloadData) {
        search()
      }
    }

    const handlePageChange = ({ currentPage, pageSize }) => {
      formInline.currentPage = currentPage
      formInline.pageSize = pageSize
      search()
    }

    return () => (
      <n-card>
        <div class="questionPackageList">
          <el-form inline={true} v-model={state.formInline} class="demo-form-inline">
            <el-form-item label="类型：" prop="bagType">
              <el-select clearable style={{ width: '100%' }} v-model={formInline.bagType} placeholder="请选择">
                {bagTypeList.map((item) => {
                  return <el-option key={item.value} label={item.label} value={item.value} />
                })}
              </el-select>
            </el-form-item>
            <el-form-item label="问题包名称：" prop="bagName">
              <el-input v-model={formInline.bagName} placeholder="名称" />
            </el-form-item>
            <el-form-item label="问题包编号：" prop="bagNum">
              <el-input v-model={formInline.bagNum} placeholder="问题包编号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" onClick={search}>
                查询
              </el-button>
              <el-button type="warning" onClick={reset}>
                重置
              </el-button>
            </el-form-item>
          </el-form>
          <div style={{ marginBottom: '15px' }}>
            <el-button type="primary" onClick={handleNewBag}>
              新建问题包
            </el-button>
          </div>
          <div class="tableWapper">
            <el-table border data={state.tableData.list} style="width: 100%" height="100%" v-loading={state.loading}>
              <el-table-column prop="bagName" label="问题包名称" v-slots={bagNameSlots}></el-table-column>
              <el-table-column prop="bagNum" label="问题包编号"></el-table-column>
              <el-table-column prop="bagType" label="类型" v-slots={bagTypeSlots}></el-table-column>
              <el-table-column prop="updateTime" label="修改时间"></el-table-column>
              <el-table-column prop="updateUserName" label="修改人"></el-table-column>
              <el-table-column prop="bagPassStandard" label="及格标准"></el-table-column>
              <el-table-column
                prop="action"
                width="280"
                align="center"
                label="操作"
                v-slots={actionSlots}
              ></el-table-column>
            </el-table>
          </div>

          <div class="paginationArea">
            <NPagination total={state.tableData.total} onHandleChange={handlePageChange} />
          </div>
          <el-drawer
            size={1000}
            title={drawerTitle.value}
            v-model={state.drawerShow}
            direction="rtl"
            destroy-on-close={true}
          >
            <QuestionPackageDetail
              isEdit={state.isEdit}
              isReadonly={state.isReadonly}
              closeDrawer={closeDrawer}
              detailData={state.detailData}
            />
          </el-drawer>
        </div>
      </n-card>
    )
  },
})

export default QuestionPackageList
