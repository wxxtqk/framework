<template>
  <el-container>
    <el-header>
      <main-header :header="defaultLog" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="logs" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="name" label="用户名" align="center"> </el-table-column>
        <el-table-column property="nickname" label="昵称" align="center"> </el-table-column>
        <el-table-column property="date" label="操作时间" align="center"> </el-table-column>
        <el-table-column property="content" label="操作" align="center"> </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage":page-size="display" layout="prev, pager, next, jumper"
        :total="pageCount">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import mainHeader from '@/components/main-header'
import {fetchLog} from '@/api/log'
const SUCCESS = '200'
export default {
  data() {
    return {
      defaultLog: {
        plholder: '请输入用户名',
        input: '',
        dialogVisible: false
      },
      logs: [],
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100
    }
  },
  components: {
    mainHeader
  },
  methods: {
    _fetchLog (val) {
      fetchLog(this.currentPage, this.display, val).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.logs = res.data.rows
          this.pageCount = res.data.total
        } else {
          this.MessageError(res.message)
        }
      })
      .catch(_ => {
        this.MessageError()
      })
    },
    search(val) {
      this.currentPage = 1
      this._fetchLog(val)
    },
    // 点击页码跳转
    handleCurrentChange () {
      this._fetchLog()
    }
  },
  created () {
    this._fetchLog()
  }
}
</script>
