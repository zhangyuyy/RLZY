<template>
  <el-dialog @open="onOpen" @close="close" title="分配角色" :visible="visible">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user' //根据用户id获取员工详情数据
import { assignRoles } from '@/api/employees'

export default {
  name: 'assign',
  data() {
    return {
      checkList: [], //复选框选中状态
      roles: [] //员工列表
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    // 父组件传来的id
    employeesId: {
      type: String,
      required: true
    }
  },
  components: {},
  //   获取角色列表
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    // 获取角色列表
    async getRolesList() {
      const roles = await getRolesApi()
      // console.log(roles)
      this.roles = roles.rows
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    // 获取员工角色
    async getEmployeesRoles() {
      // 需要传入父组件里的id
      // console.log(this.employeesId);
      const { roleIds } = await getUserDetail(this.employeesId)
      // console.log(roleIds)
      this.checkList = roleIds
    },
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      // 接口需要传入角色id，和父组件传来的id
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      // 成功提示语
      this.$message.success('分配成功')
      // 调用关闭弹层接口
      this.close()
    }
  },

  created() {},
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
