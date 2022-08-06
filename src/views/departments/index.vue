<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools
          :isRoot="true"
          :treeNode="{ name: '传值教育', manager: '负责人' }"
          @add="showAddDept"
        ></treeTools>
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <treeTools
              @add="showAddDept"
              :treeNode="data"
              @remove="loadDepts"
            >
            </treeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 传入父项子弹框 -->
    <addDept @add-success='loadDepts' :visible.sync="dialogVisible" :currentNode="currentNode"></addDept>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import addDept from './components/add-dept.vue'
export default {
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      currentNode:{}
    }
  },
  components: {
    treeTools,
    addDept
  },

  created() {
    this.loadDepts()
  },

  methods: {
    // 调用组织架构接口
    async loadDepts() {
      const res = await getDepartApi()
      // console.log(res)
      this.departs = transListToTree(res.depts, '')
    },
    // tree-toosl像父组件传值
  showAddDept(val){
      this.dialogVisible = true
      this.currentNode=val

    }
  }
}
</script>

<style scoped lang="less"></style>
