<template>
  <el-container>
    <el-header>
      <main-header :header="header" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="lists" border>
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column label="群ID"  align="center" property="id" ></el-table-column>
        <el-table-column label="群名称"  align="center" property="imGroupName" ></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-dropdown split-button trigger="click" size="medium">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="lookMember(scope.row)">查看群组成员</el-dropdown-item>
                <el-dropdown-item @click.native="dissolution(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listspage.page"
        :page-size="listspage.display"
        layout="prev, pager, next, jumper"
        :total="listspage.total">
      </el-pagination>
    </el-footer>
    <!-- 增加群组 -->
    <add-group :group="header" @finish="finish"></add-group>
    <!-- 查看群里的用户 -->
    <add-member :members="members"></add-member>
  </el-container>
</template>

<script>
import mainHeader from '@/components/main-header'
import addMember from './add-member'
import addGroup from './add-group'
import { fetchRoom, dissolution, searchGroupName } from '@/api/group'
const SUCCESS = '200'
export default {
  data () {
    return {
      header: {
        plholder: '请输入群组名称',
        input: '',
        dialogVisible: false,
        type: false,
        btn: '新增群组',
        bool: true
      },
      lists: [], // 群列表
      listspage: {
        page: 1,
        display: 8,
        total: 50
      },
      members: {
        visible: false,
        member: {}
      }
    }
  },
  components: {
    mainHeader, addGroup, addMember
  },
  methods: {
    // 分组列表模糊查询
    search(content) {
      this.listspage.page = 1
      searchGroupName(this.listspage.page, this.listspage.display, content).then(res => {
        if (res.data.state === SUCCESS) {
          this.lists = res.data.data.rows
          this.listspage.total = res.data.data.total
        } else {
          this.MessageError(res.data.message)
        }
      })
      .catch(() => {
        this.MessageError()
      })
    },
    // 获取所有群组
    roomList () {
      let data = {
        page: this.listspage.page,
        rows: this.listspage.display
      }
      fetchRoom(data).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.lists = res.data.rows
          this.listspage.total = res.data.total
        } else {
          this.message.error(res.message)
        }
      })
      .catch(() => {
        this.message.error('连接服务器出错')
      })
    },
    // 添加完成
    finish () {
      this.roomList()
    },
    // 打开群成员面板
    lookMember (row) {
      this.members.member = row
      this.members.visible = true
    },
    // 解散群
    dissolution (row) {
      let data = {
        imGroupId: row.id
      }
      dissolution(data).then(res => {
        res = res.data
        if (res.state === SUCCESS) {
          this.$message({
            type: 'success',
            message: '解散群组成功'
          })
          this.roomList()
        } else {
          this.$message.error('解散群失败')
        }
      })
      .catch(() => {
        this.$message.error('连接数据库失败')
      })
    },
    handleSizeChange (val) {
      console.log(`每页${val}`)
    },
    handleCurrentChange (val) {
      this.roomList()
      console.log(`当前${val}页`)
    }
  },
  created () {
    this.roomList()
  }
}
</script>
