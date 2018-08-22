<template>
    <el-row>
        <el-col :span="11">
          <el-input :placeholder="header.plholder" prefix-icon="el-icon-search" v-model="header.input"></el-input>
        </el-col>
        <el-col :span="12" class="text-align">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" @click="add" v-if="header.bool">{{header.btn}}</el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props: {
    header: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.header.input)
    },
    add () {
      this.header.dialogVisible = true
      this.header.type = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.text-align
  text-align left
</style>

