<template>
  <el-container>
    <el-header>
      <main-header v-bind:header="defaultRole" @search="search"></main-header>  
    </el-header>
    <el-main>
      <!-- <el-table v-bind:data="jurisdiction"> -->
      <el-table :data="roles" border style="width: 100%">
        <el-table-column type="index" width="0" label="序号"></el-table-column>
        <el-table-column prop="deptName" label="角色名称" align="center" ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
             <el-button size="mini" type="danger" @click="deleteRole(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-table> -->
    </el-main>
    <el-footer>
    </el-footer>
    <add-role :defaultRole="defaultRole" @finishAddRole="finishAddRole"></add-role>

  </el-container>
</template>

<script>
import mainHeader from '@/components/main-header'
import { fetchRoles, deleteRole, searchRole } from '@/api/role'
import addRole from './add-role'
const SUCCES = '200'
export default {
  components: {
    mainHeader,
    addRole
  },
  data () {
    return {
      defaultRole: {
        plholder: '角色',
        input: '',
        dialogVisible: false,
        type: true,
        btn: '新增角色',
        bool: true
      },
      roles: []
    }
  },
  methods: {
    fetchRoles () {
      fetchRoles().then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.roles = res.data
        }
      })
    },
    finishAddRole() {
      this.fetchRoles()
    },
    // 搜索角色名称
    search(val) {
      searchRole(1, 10, val).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.roles = res.data
        } else {
          this.MessageError(res.message)
        }
      })
      .catch(_ => {
        this.MessageError()
      })
    },
    deleteRole(scope) {
      deleteRole(scope.row.deptId).then(res => {
        res = res.data
        if (res.state === SUCCES) {
          this.fetchRoles()
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
    this.fetchRoles()
  }

}
</script>

