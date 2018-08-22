<template>
  <el-container>
    <!-- <div>this linkageunit page</div> -->
    <el-header>
      <main-header :header="linkageunit" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="linkageLists" border style="width: 100%">
        <el-table-column type="index" label="编号" width="50"> </el-table-column>
        <el-table-column property="linkageUnitName" label="联动名称"> </el-table-column>
        <el-table-column property="linkageUnitTypeName" label="类型"> </el-table-column>
        <el-table-column property="linkageUnitAddress" label="地址"> </el-table-column>
        <el-table-column property="linkageUnitContacts" label="联系人"> </el-table-column>
        <el-table-column property="linkageUnitTel" label="联系电话"> </el-table-column>
        <el-table-column property="linkageUnitLon" label="地理经度"> </el-table-column>
        <el-table-column property="linkageUnitLat" label="地理纬度"> </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <!-- <el-button size="mini" >查看</el-button> -->
            <el-button size="mini" type="primary" @click="editUnit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteLinkage(scope.row)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="display"
      layout="prev, pager, next, jumper"
      :total="pageTotal">
    </el-pagination>

    </el-footer>
    <add-linkageunit ref="linkUnit" :linkageunit="linkageunit" @updateList="updateList" :linkageInfo="linkageInfo" @resetData="resetData"></add-linkageunit>

  </el-container>
</template>

<script>
import { linkageList, deleteLinkageunit, searchLinkageUnit } from '@/api/linkageunit'
import mainHeader from '@/components/main-header'
import addLinkageunit from './add-linkageunit'
const SUCCES = '200'
export default {
  components: {
    mainHeader,
    addLinkageunit
  },
  data () {
    return {
      linkageunit: {
        input: '',
        plholder: '请输入单位名称',
        dialogVisible: false,
        type: true,
        btn: '新增单位',
        bool: true,
        isNew: true
      },
      requset: {}, // 数据
      linkageLists: [], // 联动单位列表
      linkageInfo: {}, // 联动单位的新增、修改表单
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条信息
      pageTotal: 100 // 总共多少条数据
    }
  },
  methods: {
    resetData() {
      this.linkageInfo = {}
    },
    // 模糊查询联动单位
    search(content) {
      searchLinkageUnit(this.currentPage = 1, this.display, content).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.linkageLists = res.data.rows
          this.pageTotal = res.data.total
        } else {
          this.MessageError(res.message)
        }
      })
      .catch(_ => {
        this.MessageError()
      })
    },
    // 获取联动单位列表
    fetchLinkageunint () {
    // debugger
      linkageList(this.currentPage, this.display).then((response) => {
        response = response.data
        // console.info(response)
        if (response.state === SUCCES) {
          this.linkageLists = response.data.rows
          this.pageTotal = response.data.total
        }
      }).catch(() => {
        this.$message.error('服务器连接失败')
      })
    },
    updateList () {
      this.linkageInfo = {}
      this.fetchLinkageunint()
    },
    // 分页重新获取数据
    handleCurrentChange () {
      this.fetchLinkageunint()
    },
    // 删除具体某一个联动单位 （根基id删除）
    deleteLinkage (row) {
      console.info(`id为:${row.linkageUnitId}`)
      // console.info('删除')
      this.$confirm('此操作将永久删除该条内容, 是否继续？', '提示', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.info('删除执行')
        deleteLinkageunit(row.linkageUnitId).then(res => {
          res = res.data
          if (res.state === SUCCES) {
            this.fetchLinkageunint()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          }
        }).catch(() => {
          this.$message.error('连接数据库失败')
        })
      }).catch(() => {
        console.info('取消删除执行')
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑联动单位
    editUnit(row) {
      this.linkageInfo = row
      this.linkageunit.dialogVisible = true
      // this.$refs.linkUnit.restData()
      this.linkageunit.isNew = false
    }

  },
  created () {
    this.fetchLinkageunint()
  }
}
</script>