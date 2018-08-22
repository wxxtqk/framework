<template>
  <el-dialog title="新增群组"  :visible.sync="group.dialogVisible" width="50%" :before-close="handleClose" top="5vh">
      <el-form :model="form" rel="form" label-width="150px">
        <el-form-item label="群名称">
          <el-input v-model="form.imGroupName" placeholder="群名称"></el-input>
        </el-form-item>
        <el-form-item label="群描述">
          <el-input v-model="form.remark" placeholder="群描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading">立即创建</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script>
import { addRoom } from '@/api/group'
export default {
  props: {
    group: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false,
      form: {
        imGroupName: '',
        remark: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.group.dialogVisible = false
      this.loading = false
    },
    onSubmit () {
      this.loading = true
      addRoom(this.form).then(res => {
        res = res.data
        this.group.dialogVisible = false
        if (res.state === '200') {
          this.$message({
            type: 'success',
            message: '添加群成功'
          })
          this.loading = false
          this.$emit('finish')
        } else {
          this.$message.error('添加失败')
          this.loading = false
        }
      })
      .catch(() => {
        this.loading = false
        this.$message.error('连接服务器失败')
      })
    }
  }
}
</script>

