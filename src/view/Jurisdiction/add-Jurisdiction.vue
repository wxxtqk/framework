<template>
  <el-dialog title="提示" :visible.sync="addJurisdiction.dialogVisible"
  width="30%">
  <h2>修改权限管理</h2><br>
  <el-select v-model="permission.remark" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.deptName"
      :label="item.deptName"
      :value="item.deptName">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addJurisdiction.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editPermission">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { fetchRoles } from '@/api/role'
import { setPermission } from '@/api/permission'
const SUCCES = '200'
export default {
  props: {
    addJurisdiction: {
      type: Object,
      default: function () {
        return {}
      }
    },
    permission: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      options: []
    }
  },
  methods: {
    fetchRoles () {
      fetchRoles().then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.options = res.data
        }
      })
    },
    editPermission() {
      setPermission(this.permission.id, this.permission.remark).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.addJurisdiction.dialogVisible = false
          this.$emit('finishPermission')
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
  created () {
    this.fetchRoles()
  }
}
</script>
