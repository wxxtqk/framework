<template>
  <el-container>
    <el-header>
      <main-header :header="account" @search="searchHistory"></main-header>
    </el-header>
    <el-main>
      <el-table :data="contents" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column label="聊天时间"  align="center">
          <template slot-scope="scope">
              {{scope.row.date|filterDate}}
          </template>  
        </el-table-column>
        <el-table-column prop="user" label="用户名" align="center"></el-table-column>
        <el-table-column prop="value" label="聊天内容" align="center"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import mainHeader from '@/components/main-header'
import { chatHistory } from '@/api/chatHistory'
const SUCCESS = '200'
export default {
  components: {
    mainHeader
  },
  data() {
    return {
      account: {
        input: '',
        plholder: '请输入用户名、昵称',
        dialogVisible: false,
        type: true, // 判断是增加用户界面还是修改用户界面 true=>新增用户
        btn: '新增用户'
      },
      contents: []
    }
  },
  methods: {
    searchHistory(val) {
      chatHistory(val).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.contents = res.data
        } else {
          this.myMessage(res.message)
        }
      })
      .catch(() => {
        this.myMessage()
      })
    },
    myMessage(msg = '服务器开吃饭了！请等会儿') {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error'
      })
    }
  }
}
</script>




