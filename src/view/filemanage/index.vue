<template>
  <el-container>
    <el-header>
      <main-header :header="header" @search="search"></main-header>
    </el-header>
    <el-main>
      <el-table :data="units" border>
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column label="名称" width="130" align="center" property="unitName"></el-table-column>
        <el-table-column label="经度" align="center" property="lon"></el-table-column>
        <el-table-column label="纬度" align="center" property="lat"></el-table-column>
        <el-table-column label="地址" align="center" property="unitAddress"></el-table-column>
        <el-table-column label="电话" align="center" property="unitPhot"></el-table-column>
        <el-table-column label="消防安全管理人" align="center" property="fireManager"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-dropdown split-button trigger="click" size="medium">
              操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="lookMember(scope.row)">上传文件</el-dropdown-item>
                <el-dropdown-item @click.native="editUnit(scope.row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native="dissolution(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="display"
          layout="prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-footer>
    <!-- 上传文件弹框 -->
    <el-dialog :visible="dialogVisible" width="50%" :before-close="handleClose" top="5vh">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="item in fileType" :label="item.sysParamName" :name="item.sysParamType" :sysParamLogicId="item.sysParamLogicId"></el-tab-pane>
        </el-tabs>
      </template>
      <template>
      <el-container>
        <!-- <el-aside width="200px">
          <template>
            <div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div>
            </div>
          </template>
        </el-aside> -->
        <el-main>
          <el-table :data="fileList" border>
            <el-table-column label="序号" width="50" type="index"></el-table-column>
            <el-table-column label="文件名" align="left" property="unitDrawingName"></el-table-column>
            <el-table-column label="文件地址" align="left" property="url"></el-table-column>
            <el-table-column label="操作" align="center" property="lat">
              <template slot-scope="scope">
                <a :href="scope.row.url" target="_blank"><el-button size="mini" type="primary">查看</el-button></a>
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
           <el-upload v-if="!isFullPic"
            class="upload-demo"
            :action="uploadUrl"
            :data="uploadData"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="uploadSuccess"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileLists">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-button size="small" type="primary" v-if="isFullPic" @click="fullPicVisible=true">新增全景图</el-button>
        </el-main>
      </el-container>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      <!-- 修改文件名字 -->
      <el-dialog width="30%" :visible.sync="innerVisible" append-to-body>
        <template>
          <el-form :inline="true" label-width="80px" :model="fileItem">
            <el-form-item label="文件名">
              <el-input v-model="fileItem.unitDrawingName"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="confirmEdit()">确认修改</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-dialog>
      <!-- 新增全景url文件 -->
      <el-dialog width="30%" :visible.sync="fullPicVisible" append-to-body>
        <template>
          <el-form :inline="true" label-width="100px" :model="fullPicUrl">
            <el-form-item label="全景图地址">
              <el-input v-model="fullPicUrl"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="addPicUrl()">增加</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-dialog>
    </el-dialog>
    <!-- 添加重点单位 -->
    <add-unit :addUnit="header" :unitMsg="unitMsg" ref="addUnit" @resetData="resetData"></add-unit>
  </el-container>
</template>

<script>
  import mainHeader from '@/components/main-header'
  import addUnit from './add-unit'
  import {getToken} from '@/utils/auth'
  import {$http} from '@/utils/config'
  import { fectchList, fetchType, fetchSource, modfiyImgName, deleteFile, deleteUnit } from '@/api/filemanage'
  const SUCCESS = '200'
  export default {
    components: {
      mainHeader, addUnit
    },
    data() {
      return {
        fullPicVisible: false, // 控制全景图diglog
        fullPicUrl: '', // 全景图地址
        fileLists: [],
        header: {
          plholder: '请输入重点单位名称',
          input: '',
          dialogVisible: false,
          type: true,
          btn: '新增重点单位',
          bool: true
        },
        fileItem: {
          unitDrawingName: '',
          unitDrawingLogicId: ''
        },
        unitMsg: {},
        currentPage: 1,
        total: 50,
        display: 7,
        units: [],
        fileType: [],
        imageUrl: '',
        dialogVisible: false, // 弹窗框
        innerVisible: false, // 内嵌弹出框
        activeName: '', // 标签页默认
        unitId: '', // 事故单位id
        fileTypeId: '', // 文件类型id
        fileList: [],
        isFullPic: true,
        uploadData: {
          unit_id: '',
          unit_drawing_type: ''
        },
        headers: {},
        uploadUrl: ''
      }
    },
    methods: {
      search(val) {
        this.currentPage = 1
        this.updateList(val)
      },
      resetData() {
        this.unitMsg = {}
      },
      // 确认新增全景图地址
      addPicUrl() {
        console.log(this.fullPicUrl)
        this.fullPicVisible = false
      },
      // 单击翻页
      handleCurrentChange() {
        this.updateList()
      },
      // 更新数据
      updateList(val) {
        let data = {
          page: this.currentPage,
          size: this.display,
          unitName: val !== undefined ? val : ''
        }
        fectchList(data).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.units = res.data.list
            this.total = res.data.total
          } else {
            this.$message.error(res.message)
          }
        })
        .catch((error) => {
          console.log(error)
          // this.$message.error(error)
        })
      },
      // 修改文件
      confirmEdit () {
        modfiyImgName(this.fileItem).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.innerVisible = false
            this.getSource()
          } else {
            this.myMessage(res.message)
          }
        })
        .catch(() => {
          this.myMessage()
        })
      },
      // 修改文件和上传文件
      handleEdit(index, scope) {
        this.fileItem.unitDrawingLogicId = scope.unitDrawingLogicId
        this.fileItem.unitDrawingName = scope.unitDrawingName
        this.innerVisible = true
      },
      handleDelete(index, scope) {
        deleteFile(scope.unitDrawingLogicId).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getSource()
          } else {
            this.myMessage(res.message)
          }
        })
        .catch(() => {
          this.myMessage()
        })
      },
      // 修改重点单位
      editUnit(row) {
        this.header.type = false
        this.header.dialogVisible = true
        this.unitMsg = row
      },
      // 选择上传文件
      lookMember(row) {
        this.unitId = row.logicalId
        this.uploadData.unit_id = this.unitId
        this.isFullPic = true
        // 获取事故单位的图片类型
        fetchType().then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.fileType = res.data
            this.activeName = this.fileType[0].sysParamType
            this.fileTypeId = this.fileType[0].sysParamLogicId
            this.uploadData.unit_drawing_type = this.fileTypeId
            this.dialogVisible = true
            this.getSource()
          }
        })
        .catch(() => {
          this.$message.error('连接数据库失败')
        })
      },
      // 删除重点单位
      dissolution(row) {
        // 删除提示函数
        this.$confirm('此操作将永久, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUnit(row.logicalId).then(res => {
            res = res.data
            if (res.state === SUCCESS) {
              this.MessageSuccess('删除数据成功')
              this.updateList()
            } else {
              this.MessageError(res.message)
            }
          })
          .catch(() => {
            this.MessageError()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 关闭弹出框
      handleClose() {
        this.dialogVisible = false
      },
      // 切换标签页
      handleClick(tab, event) {
        this.fileTypeId = tab.$attrs.sysParamLogicId
        this.uploadData.unit_drawing_type = this.fileTypeId
        this.isFullPic = tab.label === '全景图'
        this.getSource()
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isLt2M = file.size / 1024 / 1024 < 2

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
        // }
        // return isJPG && isLt2M
      },
      // 上传文件成功
      uploadSuccess() {
        this.getSource()
      },
      // 获取文件
      getSource() {
        fetchSource(this.unitId, this.fileTypeId).then(res => {
          res = res.data
          if (res.state === SUCCESS) {
            this.fileList = res.data
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message.error('连接数据库失败')
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      myMessage(msg = '服务器开吃饭了！请等会儿') {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
    },
    created() {
      this.updateList()
      this.headers.token = getToken()
      this.uploadUrl = `${$http}/ods_manager_web/unitDrawing/upload`
    }
  }
</script>
<style lang="stylus" scoped>
  .hljt-upload
    margin-top 15px
  .avatar-uploader
    div
      border 1px dashed #d9d9d9
      border-radius 6px
      cursor pointer
      position relative
      overflow hidden
    div:hover
      border-color #409EFF
    .avatar-uploader-icon
      font-size 28px
      color #8c939d
      width 150px
      height 150px
      line-height 150px
      text-align center
    .avatar
      width 150px
      height 150px
      display block
</style>

