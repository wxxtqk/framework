<template>
  <el-dialog title="提示" :visible.sync="keyword.dialogVisible"
  width="30%">
  <el-form :inline="true" :model="itemWord" class="demo-form-inline">
  <el-form-item label="关键字">
    <el-input v-model="itemWord.content" placeholder="关键字"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="keyword.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addWord" v-if="keyword.type">新 增</el-button>
    <el-button type="primary"  @click="editWord" v-if="!keyword.type">修 改</el-button>
  </span>
</el-dialog>
</template>
<script>
import { addWord, editWord } from '@/api/keyWord'
const SUCCESS = '200'
export default {
  props: {
    keyword: {
      type: Object,
      default: function () {
        return {}
      }
    },
    itemWord: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    // 新增关键字
    addWord() {
      addWord(this.itemWord.content).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.$message({
            message: '恭喜你，添加信息成功',
            type: 'success'
          })
          this.keyword.dialogVisible = false
          this.$emit('finishAddWord')
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
    },
    // 修改关键字
    editWord() {
      editWord(this.itemWord.content, this.itemWord.id).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.$message({
            message: '恭喜你，修改信息成功',
            type: 'success'
          })
          this.keyword.dialogVisible = false
          this.$emit('finishAddWord')
        } else {
          this.myMessage(res.message)
        }
      })
      .catch(() => {
        this.myMessage()
      })
    }
  }
}
</script>