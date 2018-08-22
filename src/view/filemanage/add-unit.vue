<template>
    <el-dialog title="" :visible="addUnit.dialogVisible" width="50%" top="5vh" :before-close="addClose">
      <template>
        <el-form ref="form" :model="unitMsg" :rules="rules" label-width="130px">
          <el-form-item label="单位名称" prop="unitName">
            <el-input v-model="unitMsg.unitName"></el-input>
          </el-form-item>
          <el-form-item label="单位经度" prop="lon">
            <el-input v-model="unitMsg.lon"></el-input>
          </el-form-item>
          <el-form-item label="单位纬度" prop="lat">
            <el-input v-model="unitMsg.lat"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" prop="unitAddress">
            <el-input v-model="unitMsg.unitAddress"></el-input>
          </el-form-item>
          <el-form-item label="单位电话" prop="unitPhot">
            <el-input v-model="unitMsg.unitPhot" placeholder="手机号或座机号"></el-input>
          </el-form-item>
          <el-form-item label="消防安全管理人" prop="fireManager">
            <el-input v-model="unitMsg.fireManager"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addClose">取 消</el-button>
            <el-button type="primary" @click="add('form')" v-if="addUnit.type">确 定</el-button>
            <el-button type="primary" @click="edit('form')" v-if="!addUnit.type">修 改</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
</template>

<script>
import { addUnit, editUnit } from '@/api/filemanage'
const SUCCSEE = '200'
export default {
  props: {
    addUnit: {
      type: Object,
      default: function() {
        return {}
      }
    },
    unitMsg: {
      type: Object,
      default: function() {
        return {
          unitName: '',
          lon: '',
          lat: '',
          unitAddress: '',
          fireManager: '',
          unitPhot: ''
        }
      }
    }
  },
  data() {
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
    // 单位地址
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('单位地址不为空'))
      } else {
        callback()
      }
      callback()
    }
    // 单位电话
    var validatePhot = (rule, value, callback) => {
      var mobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      var landline = /\d{3}-\d{8}|\d{4}-\d{7}/
      if (!value) {
        return callback(new Error('请输入电话号码'))
      } else if (!mobile.test(value) && !landline.test(value)) {
        callback(new Error('请输入正确的手机号（11位）或者座机号（023-xxxxxxxx）（3位-8位）'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        unitName: [
          { required: true, message: '单位名称不为空', trigger: 'blur' }
        ],
        lon: [
          // { validator: validatelon, trigger: 'blur' }
          { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ],
        lat: [
          { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ],
        unitAddress: [
          { required: true, validator: validateAddress, trigger: 'blur' }
        ],
        unitPhot: [
          { required: true, validator: validatePhot, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    newData() {
      return {
        unitName: this.unitMsg.unitName,
        lon: this.unitMsg.lon,
        lat: this.unitMsg.lat,
        unitAddress: this.unitMsg.unitAddress,
        fireManager: this.unitMsg.fireManager,
        unitPhot: this.unitMsg.unitPhot,
        logicalId: this.unitMsg.logicalId
      }
    }
  },
  methods: {
    addClose () {
      this.addUnit.dialogVisible = false
      this.$emit('resetData')
    },
    // 修改数据
    edit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info('提交成功')
          editUnit(this.newData).then(res => {
            res = res.data
            if (res.state === SUCCSEE) {
              this.MessageSuccess('修改数据成功')
              this.addUnit.dialogVisible = false
            } else {
              this.MessageError(res.message)
            }
          })
          .catch(() => {
            this.MessageError()
          })
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    // 新增数据
    add (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info('提交成功')
          addUnit(this.unitMsg).then(res => {
            res = res.data
            if (res.state === SUCCSEE) {
              this.MessageSuccess('添加数据成功')
              this.addUnit.dialogVisible = false
            } else {
              this.MessageError(res.message)
            }
          })
          .catch(() => {
            this.MessageError()
          })
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    }
  }
}
</script>

