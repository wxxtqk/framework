<template>
  <el-container>
    <el-header>
      <main-header @search="search" v-bind:header="addJurisdiction"></main-header>  
    </el-header>
    <el-main>
      <!-- <el-table v-bind:data="jurisdiction"> -->
      <el-table :data="accounts" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="date" label="日期" align="center">
          <template slot-scope="scope">
              {{scope.row.createTime|filterDate}}
          </template>
        </el-table-column>
        <el-table-column prop="userInfo.userInfoName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="userInfo.remark" label="权限" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-dropdown split-button trigger="click" size="medium">
              操作
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item v-on:click.native="jur1(scope.row)">增加</el-dropdown-item> -->
                <el-dropdown-item v-on:click.native="installed(scope.row)">设置权限</el-dropdown-item>
                <el-dropdown-item v-on:click.native="deleted(scope.row)">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-table> -->
    </el-main>
    <el-footer>
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="display"
      layout="prev, pager, next, jumper"
      :total="pageCount">
      </el-pagination>
    </el-footer>
    <add-Jurisdiction :addJurisdiction="addJurisdiction" :permission="permission" ref="addJurisdiction" @finishPermission="finishPermission"></add-Jurisdiction>

  </el-container>
</template>

<script>
import mainHeader from '@/components/main-header'
import { accountList, searchAccount } from '@/api/account'
import { deleteAccount } from '@/api/permission'
import addJurisdiction from './add-Jurisdiction'
const SUCCES = '200'
export default {
  components: {
    addJurisdiction, mainHeader
  },
  data () {
    return {
      accounts: [],
      addJurisdiction: {
        input: '',
        plholder: '请输入用户名、昵称',
        dialogVisible: false,
        type: true, // 判断是增加用户界面还是修改用户界面 true=>新增用户
        btn: '新增用户'
      },
      permission: {},
      currentPage: 1,  //  默认显示第一页
      display: 10, // 一页显示多少条数据
      pageCount: 100 // 总共多少条数据
    }
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
    // 单个搜索用户
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
    //  注销已有权限管理
    deleted: function (row) {
      deleteAccount(row.userInfo.userInfoId).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.$message({
            message: '注销成功',
            type: 'success'
          })
          this.fetchAccount()
        } else {
          this.$message({
            showClose: true,
            message: res.message,
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
    },
    //  设置权限管理
    installed: function (row) {
      this.permission = {
        id: row.userInfo.userInfoId,
        remark: row.userInfo.remark
      }
      this.addJurisdiction.dialogVisible = true
      this.$refs.addJurisdiction.fetchRoles()
    },
    //  分页重新获取数据
    handleCurrentChange: function () {
      this.fetchAccount()
    },
    finishPermission() {
      this.fetchAccount()
    }
  },
  mounted () {
    this.fetchAccount()
  }

}
</script>

<style lang="stylus" scoped>
.el-dropdown
  vertical-align top
.el-dropdown + .el-dropdown
  margin-left 15px
.el-icon-arrow-down
  font-size 12px

</style>
