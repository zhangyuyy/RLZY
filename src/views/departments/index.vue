<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools
          :isRoot="true"
          :treeNode="{ name: '传值教育', manager: '负责人' }"
        ></treeTools>
        <!-- 树形结构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
        >
          <template v-slot="{ data }">
            <treeTools :treeNode="data"> </treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
export default {
  data() {
    return {
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  components: {
    treeTools
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
