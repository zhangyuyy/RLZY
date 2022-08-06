<template>
  <!-- 弹窗 -->
  <el-dialog @close="onClose" title="添加部门" :visible="visible" width="50%">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="1-50字符"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="1-50字符"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="1-300字符"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDepartApi,addDeptApi } from '@/api/departments'
import { getEmploApi } from '@/api/employees'

export default {
  name: 'addDept',
  data() {
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              console.log(this.currentNode)
              if (!this.currentNode.children) return callback()
              const isRepeat = this.currentNode.children.some(
                (item) => item.name === value
              )
              isRepeat ? callback(new Error('部门重复')) : callback()
            },
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: async (rule, value, callback) => {
              const { depts } = await getDepartApi()
              const isRepeat = depts.some((item) => item.code === value)
              isRepeat ? callback(new Error('部门编码重复')) : callback()
            },
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门介绍', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  // 控制弹框显示
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {}
  },
  components: {},
  methods: {
    async getEmplo() {
      const res = await getEmploApi()
      console.log(res)
      this.employees = res
    },
    // sync传过来的值用update接收，
    // 把弹框设为fals
    onClose() {
      console.log('关闭弹窗')
      this.$emit('update:visible', false)
    },
    // 点击确认
    async onSave() {
      await this.$refs.form.validate()
      // 拿到当前的Id赋值给pid
      this.formData.pid=this.currentNode.id
      try{
        await addDeptApi(this.formData)
         this.$message.success('新增部门成功')
        //  先关闭弹窗
         this.onClose()
        //关闭后更新数据  值在父组件所以需要$emit
        this.$emit('add-success')
      }catch(err){
        this.$message.error('新增部门失败')
      }
      // console.log(this.formData)
    }
  },
  created() {
    this.getEmplo()
  },
  updated() {},
  mounted() {},
  filters: {},
  computed: {},
  watch: {}
}
</script>
<style lang="less" scoped></style>
