<template>
  <el-container>
    <el-header>
      <main-header :header="account" @search="search"></main-header>
    </el-header>
    <el-main ref="elMain">
      <el-table ref="table" :data="accounts" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="userAccount" label="用户名" width="120" align="center"> </el-table-column>
        <el-table-column property="userInfo.userInfoName" label="昵称" width="120" align="center"> </el-table-column>
        <el-table-column property="roles[state]" label="单点登录" width="120" align="center">
          <template slot-scope="scope">
            {{roles[scope.row.state]}}
          </template>  
        </el-table-column>
        <el-table-column label="创建时间"  align="center">
          <template slot-scope="scope">
              {{scope.row.createTime|filterDate}}
          </template>  
        </el-table-column>
        <el-table-column label="操作" width="200"  align="center">
          <template  slot-scope="scope">
            <el-button type="primary"  v-if="scope.row.state === 0" @click="setSingle(scope)">开启单点登录</el-button>
            <el-button type="primary" v-if="scope.row.state === 1" @click="setSingle(scope)">关闭单点登录</el-button>
          </template>
        </el-table-column>
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
import { accountList, searchAccount } from '@/api/account'
import { setSingle } from '@/api/single'
const SUCCES = '200'
export default {
  data () {
    return {
      value3: true,
      account: {
        input: '',
        plholder: '请输入用户名、昵称',
        dialogVisible: false,
        type: true, // 判断是增加用户界面还是修改用户界面 true=>新增用户
        btn: '新增用户'
      },
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100,
      accounts: [],
      roles: ['未开启', '已开启']
    }
  },
  components: {
    mainHeader
  },
  methods: {
    // 获取用户列表
    fetchAccount () {
      accountList(this.currentPage, this.display).then((response) => {
        response = response.data
        if (response.state === SUCCES) {
          this.accounts = response.data.rows
          this.pageCount = response.data.total
        }
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '服务器开吃饭了！请等会儿',
          type: 'error'
        })
      })
    },
    search (val) {
      this.currentPage = 1
      searchAccount(this.currentPage, this.display, val).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.accounts = res.data.rows
          this.pageCount = res.data.total
        } else {
          this.MessageError(res.message)
        }
      })
      .catch(_ => {
        this.MessageError()
      })
    },
    // 点击页码跳转
    handleCurrentChange () {
      this.fetchAccount()
    },
    // 设置是否单点登录
    setSingle(item) {
      setSingle(item.row.userId, item.row.state).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.fetchAccount()
        } else {
          this.$message({
            showClose: true,
            message: '修改单点登录失败',
            type: 'error'
          })
        }
      })
      .catch(() => {
        this.$message({
          showClose: true,
          message: '服务器开吃饭了！请等会儿',
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.fetchAccount()
  }
}
</script>
