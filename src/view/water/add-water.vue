<template>
    <el-dialog :visible.sync="water.dialogVisible"  class="push-water" :before-close="cancel">
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
            <el-form-item label="水源名称" prop="fireWaterName">
                <el-input v-model="form.fireWaterName"></el-input>
            </el-form-item>          
            <el-form-item label="水源地址" prop="fireWaterAddress">
                <el-input v-model="form.fireWaterAddress"></el-input>
            </el-form-item>
            <el-form-item label="水源经度" prop="fireWaterLon">
                <el-input v-model="form.fireWaterLon"></el-input>
            </el-form-item>
             <el-form-item label="水源纬度" prop="fireWaterLai">
                <el-input v-model="form.fireWaterLai"></el-input>
            </el-form-item>
             <el-form-item label="取水形式" prop="intakeWharfForm">
                <el-input v-model="form.intakeWharfForm"></el-input>
            </el-form-item>
            <el-form-item label="所属单位" prop="fireWaterHomeUnit">
                <el-input v-model="form.fireWaterHomeUnit"></el-input>
            </el-form-item>
             <el-form-item label="水源状态" v-if="!water.type">
              <el-select v-model="form.fireWaterState" placeholder="请选择" @change="selectType">
                <el-option v-for="item in waterState" :key="item.key" :label="item.name" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="水源类型ID">
              <el-select v-model="form.fireWaterTypeId" :disabled="water.disabled" placeholder="请选择" @change="selectType">
                <el-option v-for="item in waterType" :key="item.fireWaterTypeId" :label="item.fireWaterTypeName" :value="item.fireWaterTypeId"></el-option>
              </el-select>
            </el-form-item>
            <!-- 水源类型为天然水源-->
            <el-form-item label="消防天然水源编号" prop="fireWaterNaturalNumber" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model="form.fireWaterNaturalNumber"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源取水高度" prop="fireWaterNaturalHeigt" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model="form.fireWaterNaturalHeigt"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源取水位置" prop="fireWaterNaturalAdress" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model="form.fireWaterNaturalAdress"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源类型" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model="form.fireWaterNaturalType"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源容积" prop="fireWaterNaturalVolume" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model="form.fireWaterNaturalVolume" placeholder="容积单位为L"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源经度" prop="fireWaterStartLon" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model.number="form.fireWaterStartLon"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源结束经度" prop="fireWaterEndLon" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model.number="form.fireWaterEndLon"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源纬度" prop="fireWaterStartLat" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model.number="form.fireWaterStartLat"></el-input>
            </el-form-item>
            <el-form-item label="消防天然水源结束纬度" prop="fireWaterEndLat" v-if="form.fireWaterTypeId==='1200'">
                <el-input v-model.number="form.fireWaterEndLat"></el-input>
            </el-form-item>
            <!-- 水源类型为消防水池 -->
            <el-form-item label="消防水池容积" v-if="form.fireWaterTypeId==='1300'">
                <el-input v-model="form.fireWaterPoolVolum" placeholder="容积单位为L"></el-input>
            </el-form-item>
            <el-form-item label="消防水池取水口位置" v-if="form.fireWaterTypeId==='1300'">
                <el-input v-model="form.fireWaterPoolIntake"></el-input>
            </el-form-item>
            <el-form-item label="消防水池量程" v-if="form.fireWaterTypeId==='1300'">
                <el-input v-model="form.fireWaterPoolRange"></el-input>
            </el-form-item>
            <el-form-item label="消防水池流量" v-if="form.fireWaterTypeId==='1300'">
                <el-input v-model="form.fireWaterPoolFlow"></el-input>
            </el-form-item>
            <!-- 水源类型为消防取水码头 -->
             <el-form-item label="消防取水码头容积" v-if="form.fireWaterTypeId==='2100'">
                <el-input v-model="form.intakeWharfVolum" placeholder="容积单位为L"></el-input>
            </el-form-item>
            <!-- 水源类型为市政消火栓 -->
            <el-form-item label="消火栓水压" v-if="form.fireWaterTypeId==='1100'">
                <el-input v-model="form.fireHydrantPressure"></el-input>
            </el-form-item>
            <el-form-item label="消火栓编号" v-if="form.fireWaterTypeId==='1100'">
                <el-input v-model="form.fireHydrantNumber"></el-input>
            </el-form-item>
            <el-form-item label="消火栓管网形式" v-if="form.fireWaterTypeId==='1100'">
                <el-input v-model="form.fireHydrantShape" placeholder="请输入环状管网或枝状管网"></el-input>
            </el-form-item>
            <el-form-item label="消火栓管径" v-if="form.fireWaterTypeId==='1100'">
                <el-input v-model="form.fireHydrantCaliber" placeholder="管径单位为mm"></el-input>
            </el-form-item>
            <el-form-item class="footer">
                <el-button type="primary" @click="onSubmit('form')" v-if="water.type">立即创建</el-button>
                <el-button type="primary" @click="onEdit('form')" v-if="!water.type">修改</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog> 
</template>
<script>
import { waterType, addWater, editInfo } from '@/api/water'
const SUCCESS = '200'
export default {
  props: {
    water: {
      type: Object,
      default: function () {
        return {}
      }
    },
    waters: {
      type: Array,
      default: function () {
        return []
      }
    },
    waterInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    form () {
      if (!this.water.type) {
        console.log('+++')
        return this.waterInfo
      } else {
        console.log('---')
        return this.defaultform
      }
    }
  },
  data () {
    // 水源经纬度
    var fireWaterLonlatValue = (rlues, value, callback) => {
      var lonlaiInteger = /\d{1,3}\.\d{8}$/
      console.info(value)
      if (!value) {
        callback(new Error('请输入数字,不可加入中文、英文、特殊符号'))
      } else if (!lonlaiInteger.test(value)) {
        callback(new Error('请以“123. 12345678”格式输入,小数点前可输入最多三位数,小数点后只能输入8位数'))
      } else {
        callback()
      }
    }

    var fireWaterTypeId = (rlues, value, callback) => {
      console.info(this.form.fireWaterTypeId)
      // console.info(this.form.fireWaterTypeId === '1200')
    }
    return {
      waterType: [],
      waterState: [{
        key: 0,
        name: '不可用'
      }, {
        key: 1,
        name: '可用'
      }],
      defaultform: {
        fireWaterName: '',
        fireWaterAddress: '',
        intakeWharfForm: '',
        fireWaterTypeName: '',
        fireWaterState: '',
        fireWaterLai: '',
        fireWaterLon: '',
        fireWaterTypeId: '1100',
        fireWaterHomeUnit: '',
        fireWaterNaturalNumber: '',
        fireWaterNaturalHeigt: '',
        fireWaterNaturalAdress: '',
        fireWaterNaturalType: '',
        fireWaterNaturalVolume: '',
        fireWaterStartLon: '',
        fireWaterEndLon: '',
        fireWaterStartLat: '',
        fireWaterEndLat: '',
        fireWaterPoolVolum: '',
        fireWaterPoolIntake: '',
        fireWaterPoolRange: '',
        fireWaterPoolFlow: '',
        intakeWharfVolum: '',
        fireHydrantPressure: '',
        fireHydrantNumber: '',
        fireHydrantShape: '',
        fireHydrantCaliber: ''
      },
      rules: {
        fireWaterName: [
          { required: true, message: '请输入水源名称', trigger: 'blur' }
        ],
        fireWaterAddress: [
          { required: true, message: '请填写水源地址', trigger: 'blur' }
        ],
        fireWaterLon: [
          { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ],
        fireWaterLai: [
          { required: true, validator: fireWaterLonlatValue, trigger: 'blur' }
        ],
        fireWaterHomeUnit: [
          { required: true, message: '请填写水源所属单位', trigger: 'blur' }
        ],
        fireWaterNaturalNumber: [
          { validator: fireWaterTypeId, trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    cancel () {
      this.water.dialogVisible = false
      this.water.disabled = false
    },
    // 获取水源类型
    fetchWaterType () {
      waterType().then((response) => {
        response = response.data
        if (response.state === SUCCESS) {
          this.waterType = response.data
        } else {
          this.$message.error(response.message)
        }
      }).catch(() => {
        this.$message.error('连接数据库失败')
      })
    },
    selectType () {
      // alert(this.form.fireWaterTypeId)
    },
    onSubmit (formName) {
        // 提交到后台
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.info('提交！')
          console.info(this.form)
          addWater(this.form).then((res) => {
            res = res.data
            if (res.state === SUCCESS) {
              this.$emit('updateList')
              this.water.dialogVisible = false
              this.$message.success('新增水源成功')
            } else {
              this.$message.error(res.message)
            }
          }).catch(() => {
            this.$message.error('连接数据库失败')
          })
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    },
    onEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editInfo(this.form).then((response) => {
            response = response.data
            if (response.state === SUCCESS) {
              this.$emit('updateList')
              this.water.dialogVisible = false
              this.$message.success('修改水源信息成功')
            } else {
              this.$message.error(response.message)
            }
          }).catch(() => {
            this.$message.error('连接数据库出错')
          })
        } else {
          console.log('提交失败！！')
          return false
        }
      })
    }
  },
  created () {
    this.fetchWaterType()
  }
}
</script>
<style lang="stylus" scoped>
.push-water
  text-align left
</style>


