<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isShowLeft">
          <i :class="leftIcon" />
          <slot name="left-tag"></slot>
        </el-tag>
      </el-col>

      <el-col>
        <el-row type="flex" justify="end"> <slot name="right" /> </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  name: 'pageTools',
  data() {
    return {}
  },
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info'
    },
    isShowLeft: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {},
  created() {},
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
