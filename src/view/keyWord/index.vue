<template>
  <el-container>
    <el-header>
      <main-header :header="keyWord" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="keyWords" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="content" label="关键字" align="center"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-dropdown split-button trigger="click" size="medium">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-on:click.native="edit(scope.row)">修改</el-dropdown-item>
                <el-dropdown-item v-on:click.native="deleted(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage":page-size="display" layout="prev, pager, next, jumper"
        :total="pageCount">
      </el-pagination>
    </el-footer>
    <add-key-word :keyword="keyWord" @finishAddWord="finishAddWord" :itemWord="itemWord"></add-key-word>
  </el-container>
</template>
<script>
import mainHeader from '@/components/main-header'
import addKeyWord from './add-key-word'
import { fetchKeyWord, deleteWord, FuzzyQuery } from '@/api/keyWord'
const SUCCESS = '200'
export default {
  data () {
    return {
      keyWord: {
        input: '',
        plholder: '请输入关键字',
        dialogVisible: false,
        type: true, // 判断是增加用户界面还是修改用户界面 true=>新增用户
        btn: '新增关键字',
        bool: true
      },
      currentPage: 1, // 默认第一页
      display: 10, // 一页显示多少条
      pageCount: 100,
      keyWords: [],
      itemWord: {}
    }
  },
  components: {
    mainHeader, addKeyWord
  },
  methods: {
    edit(row) {
      console.log(row)
      this.keyWord.dialogVisible = true
      this.itemWord = row
      this.keyWord.type = false
    },
    // 模糊查询
    search (val) {
      FuzzyQuery(this.currentPage, this.display, this.keyWord.input).then(res => {
        res = res.data
        console.info(res.data)
        if (res.state === SUCCESS) {
          this.keyWords = res.data.rows
          this.pageCount = res.data.total
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
          message: '请求失败，请稍等片刻',
          type: 'error'
        })
      })
      console.info(this.keyWord.input)
    },
    deleted(row) {
      deleteWord(row.id).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.$message({
            message: '恭喜你，删除信息成功',
            type: 'success'
          })
          this.fetchKeyWord()
        } else {
          this.myMessage(res.message)
        }
      })
      .catch(() => {
        this.myMessage()
      })
    },
    // 点击页码跳转
    handleCurrentChange () {
      this.fetchKeyWord()
    },
    finishAddWord() {
      this.fetchKeyWord()
    },
    fetchKeyWord() {
      fetchKeyWord(this.currentPage, this.display).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.keyWords = res.data.rows
          this.pageCount = res.data.total
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
    }
  },
  mounted () {
    this.fetchKeyWord()
  }
}
</script>
