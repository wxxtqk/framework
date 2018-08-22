<template>
  <el-dialog title="" :visible.sync="linkageunit.dialogVisible" :before-close="handleClose" width="50%" class="add-linkageunit">
    <el-form ref="form" :model="linkageInfo" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="linkageUnitName">
        <el-input v-model="linkageInfo.linkageUnitName"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="linkageUnitTypeName">
        <el-select v-model="linkageInfo.linkageUnitTypeName">
          <!-- [1：环境、2：检查、3：水源、4：电力、5：医院、6：供气、7：警方、8：交通、9：通讯、10：紧急情况、11：区委办、12：卫生、13：天气 ] -->
          <el-option label="环保" value="环保"></el-option>
          <el-option label="安监" value="安监"></el-option>
          <el-option label="供水" value="供水"></el-option>
          <el-option label="供电" value="供电"></el-option>
          <el-option label="医疗" value="医疗"></el-option>
          <el-option label="供气" value="供气"></el-option>
          <el-option label="公安" value="公安"></el-option>
          <el-option label="交警" value="交警"></el-option>
          <el-option label="通讯" value="通讯"></el-option>
          <el-option label="应急" value="应急"></el-option>
          <el-option label="区府" value="区府"></el-option>
          <el-option label="卫生" value="卫生"></el-option>
          <el-option label="气象" value="气象"></el-option>
          <el-option label="武警" value="武警"></el-option>
          <el-option label="其它" value="其它"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地址" prop="linkageUnitAddress">
        <el-input v-model="linkageInfo.linkageUnitAddress"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="linkageUnitTel">
        <el-input v-model.trim="linkageInfo.linkageUnitTel"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="linkageUnitContacts">
        <el-input v-model="linkageInfo.linkageUnitContacts"></el-input>
      </el-form-item>
      <el-form-item label="地理经度" prop="linkageUnitLon">
        <el-input v-model="linkageInfo.linkageUnitLon" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="地理纬度" prop="linkageUnitLat">
        <el-input v-model="linkageInfo.linkageUnitLat"></el-input>
      </el-form-item>

      <el-form-item class="footerButtom">
        <el-button type="primary" @click="onSubmit('form')" v-if="linkageunit.isNew">创建</el-button>
        <el-button type="primary" @click="edit('form')" v-if="!linkageunit.isNew">修改</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
import { addLinkageunit, editLinkageunit } from '@/api/linkageunit'
const SUCCES = '200'
export default {
  props: {  // 父组件传下来的
    linkageunit: {
      type: Object,
      default: function () {
        return {}
      }
    },
    linkageInfo: {
      type: Object,
      default: function() {
        return {
          linkageUnitName: '', // 名称
          linkageUnitTypeName: '', // 类型
          linkageUnitAddress: '', // 地址
          linkageUnitTel: '', // 电话
          linkageUnitContacts: '', // 联系人
          linkageUnitLon: '', // 地理经度
          linkageUnitLat: '' // 地理纬度
        }
      }
    }
  },
  data () {
    // 联系电话验证
    var tell = (rule, value, callback) => {
      var mobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      var landline = /\d{3}-\d{8}|\d{4}-\d{7}/
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else if (!mobile.test(value) && !landline.test(value)) {
        callback(new Error('请输入正确的手机号（11位）或者座机号（023-xxxxxxxx）（3位-8位'))
      } else {
        callback()
      }
    }
    // 水源经纬度
    var fireWaterLonlatValue = (rlues, value, callback) => {
      var lonlaiInteger = /\d{1,3}\.\d{8}$/
      if (!value) {
        callback(new Error('请输入数字,不可加入中文、英文、特殊符号'))
      } else if (!lonlaiInteger.test(value)) {
        callback(new Error('请以“123. 12345678”格式输入,小数点前可输入最多三位数,小数点后只能输入8位数'))
      } else {
        callback()
      }
    }
    return {
      // isNew: true,
      rules: {
        linkageUnitName: [
          {required: true, message: '请输入联动单位的名称', trigger: 'blur'},
          {min: 2, message: '长度不得小于3个字', trigger: 'blur'}
        ],
        linkageUnitTypeName: [
          {required: true, message: '请选择填写类型'}
        ],
        linkageUnitAddress: [
          {required: true, message: '请填写联动单位的地址', trigger: 'blur'},
          {min: 4, message: '长度不得小于4个字', trigger: 'blur'}
        ],
        linkageUnitTel: [
          {validator: tell, trigger: 'blur'}
        ],
        linkageUnitContacts: [
          {required: true, message: '请填写联系人', trigger: 'blur'}
        ],
        linkageUnitLon: [
           { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ],
        linkageUnitLat: [
           { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.linkageunit.dialogVisible = false
      this.linkageunit.isNew = true
      this.$emit('resetData')
    },
    // 新增联动单位
    onSubmit (formName) {
      // this.isNew = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info('提交')
          addLinkageunit(this.linkageInfo).then((res) => {
            res = res.data
            if (res.state === SUCCES) {
              this.$emit('updateList')
              this.linkageunit.dialogVisible = false
            } else {
              this.$message.error(res.message)
            }
          }).catch(() => {
            this.$message.error('连接数据库失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改联动单位
    edit(formName) {
      // this.isNew = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editLinkageunit(this.linkageInfo).then(res => {
            res = res.data
            if (res.state === SUCCES) {
              this.$message({
                message: '恭喜你，修改信息成功',
                type: 'success'
              })
              this.linkageunit.dialogVisible = false
            } else {
              this.myMessage(res.message)
            }
          })
          .catch(() => {
            this.myMessage()
          })
        } else {
          console.log('error edit!!!')
          return false
        }
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

<<style lang="stylus" scoped>
.add-linkageunit
  text-align left
  .footerButtom
    text-align center
    margin 0
</style>

