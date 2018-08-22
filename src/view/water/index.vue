<template>
  <el-container>
    <el-header>
      <main-header :header="water" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="waters" style="width: 100%" border>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column property="fireWaterTypeName" label="水源类型名称" width="120" align="center"> </el-table-column>
        <el-table-column property="fireWaterName" label="水源名称" width="120" align="center"> </el-table-column>
        <el-table-column property="fireWaterAddress" label="水源位置" width="120" align="center"> </el-table-column>
        <el-table-column property="fireWaterLon" label="经度" width="120" align="center"> </el-table-column>
        <el-table-column property="fireWaterLai" label="纬度" width="120" align="center"> </el-table-column>
        <el-table-column label="水源状态" width="120" align="center"> 
          <template slot-scope="scope">
            {{waterState[scope.row.fireWaterState]}}
          </template>
        </el-table-column>
        <el-table-column property="fireWaterHomeUnit" label="所属单位" align="center"> </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template  slot-scope="scope">
            <el-dropdown split-button  trigger="click" size="medium">
            操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editWater(scope.row)">修改水源</el-dropdown-item>
                <el-dropdown-item  @click.native="deleteWter(scope.row)">删除水源</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="display"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-footer>
    <add-water :water="water" :waters="waters" @updateList="updateList" :waterInfo="waterInfo"></add-water>
  </el-container>
</template>
<script>
  import { waterList, deleteWater, editWater } from '@/api/water'
  import mainHeader from '@/components/main-header'
  import addWater from './add-water'
  const SUCCESS = '200'
  export default {
    components: {
      mainHeader,
      addWater
    },
    data () {
      return {
        water: {
          input: '',
          plholder: '请输入水源范围',
          dialogVisible: false,
          type: true, // 判断是增加水源还是修改水源界面 true=>新增用户
          btn: '新增水源',
          bool: true,
          disabled: false
        },
        waters: [],
        total: 50,
        waterInfo: {},
        waterState: ['不可用', '可用'],
        currentPage: 1, // 默认第一页
        display: 10 // 一页显示多少条
      }
    },
    methods: {
      // 分页
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.fetchWater()
      },
      search(val) {
        this.currentPage = 1
        this.condition = val
        this.fetchWater()
      },
      // 获取水源列表
      fetchWater () {
        waterList(this.currentPage, this.display, this.condition).then((response) => {
          response = response.data
          console.log(response)
          if (response.state === SUCCESS) {
            this.waters = response.data.rows
            this.total = response.data.total
          }
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '服务器开小差了！请等会儿',
            type: 'error'
          })
        })
      },
      updateList () {
        this.currentPage = 1
        this.water.disabled = false
        this.fetchWater()
      },
      // 修改水源信息中中水源信息回显
      editWater (row) {
        this.water.dialogVisible = true
        this.water.type = false
        this.water.disabled = true
        editWater(row.fireWaterInfoId, row.fireWaterTypeId, row.fireWaterId).then((response) => {
          response = response.data
          if (response.state === SUCCESS) {
            this.waterInfo = response.data
            this.$message.success('获取水源信息成功')
          } else {
            this.$message.error('获取水源信息失败')
          }
        }).catch(() => {
          this.$message.error('连接数据库出错')
        })
      },
      // 删除水源
      deleteWter (row) {
        deleteWater(row.fireWaterId, row.fireWaterTypeId, row.fireWaterInfoId).then((response) => {
          response = response.data
          if (response.state === SUCCESS) {
            this.updateList()
            this.$message.success('删除水源成功')
          } else {
            this.$message.error(response.message)
          }
        }).catch(() => {
          this.$message({
            showClose: true,
            message: '服务器开小差了！请等会',
            type: 'error'
          })
        })
      }
    },
    created () {
      this.fetchWater()
    }
  }
</script>

