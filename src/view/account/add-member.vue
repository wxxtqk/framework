<template>
    <el-dialog title="成员列表" :visible="memberVisible" width="40%" :before-close="handleClose">
      <el-row>
        <el-col :span="12">
          <el-input v-model="pushMember" placeholder="请输入好友名称"  @keyup.enter.native="addMember"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button icon="el-icon-plus" @click="addMember"></el-button>
        </el-col>
        <el-table :data="memberLists" style="width: 100%"  border>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="用户名" prop="owner" width="100" align="left"></el-table-column>
          <el-table-column label="操作" align="left">
            <template  slot-scope="scope">
              <el-button size="mini" @click="remove(scope.row)">移除群</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
</template>

<script>
  import { fetchMember, pushMember, removeUser } from '@/api/group'
  const SUCCESS = '200'
  export default {
    props: {
      members: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        pushMember: '',
        memberLists: []
      }
    },
    computed: {
      memberVisible () {
        if (this.members.visible === true) {
          this.fetchMembers()
        }
        return this.members.visible
      }
    },
    methods: {
      // 添加好友
      addMember () {
        if (this.pushMember === '') {
          return false
        }
        var data = {
          groupId: this.members.member.id,
          userName: this.pushMember
        }
        pushMember(data).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.page = 1
            this.fetchMembers()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message.error('连接数据库失败')
        })
      },
      // 获取群成员
      fetchMembers () {
        let data = {
          page: this.page,
          rows: this.display,
          groupId: this.members.member.id
        }
        fetchMember(data).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.memberLists = res.data
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message.error('连接服务器出错')
        })
      },
      // 关闭弹出框
      handleClose () {
        this.page = 1
        this.members.visible = false
      },
      // 移除群
      remove (row) {
        var data = {
          groupId: this.members.member.id,
          userName: row.owner
        }
        removeUser(data).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.$message.success('移除成功')
            this.page = 1
            this.fetchMembers()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message.error('连接数据库失败')
        })
      }
    }
  }
</script>
