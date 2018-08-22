<template>
  <el-dialog title="提示" :visible.sync="defaultRole.dialogVisible"
  width="30%">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="角色名">
    <el-input v-model="formInline.deptName" placeholder="角色名"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="defaultRole.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addrole">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import { addRole } from '@/api/role'
const SUCCESS = '200'
export default {
  props: {
    defaultRole: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      formInline: {
        deptName: ''
      }
    }
  },
  methods: {
    addrole() {
      addRole(this.formInline.deptName).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.defaultRole.dialogVisible = false
          this.$emit('finishAddRole')
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
  }
}
</script>