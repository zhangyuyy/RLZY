<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            @click="addDialogVisible = true"
            type="primary"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="showRightsDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger" @click="onRemove(row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[3, 5, 10, 20]"
            layout="sizes,prev, pager, next"
            :total="total"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加角色对话框 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- :model -->
      <!-- v-model @input :value -->
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button @click="onAddRole" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
      destroy-on-close
      @close="setRightsClose"
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        v-if="setRightsDialog"
        :data="permissions"
        :default-checked-keys="defaultCheckKeys"
        :props="{ label: 'name' }"
        ref="perTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  addRoleApi,
  removeRoleApi,
  getRolesInfo,
  assignPerm
} from '@/api/role.js'
import { getCompanyInfoApi } from '@/api/setting.js'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
import MixinPermission from '@/mixins/permissions'
export default {
  mixins: [MixinPermission],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '', // 部门名称
        region: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }]
      },
      companyInfo: {},
      setRightsDialog: false,
      permissions: [],
      defaultCheckKeys: ['1', '1063315016368918528'],
      roleId: ''
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getpermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    // 点击取消
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    // 监听对话框关闭
    dialogClose() {
      // 前置: 只能重置有校验的表单
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async onRemove(id) {
      await removeRoleApi(id)
      this.$message.success('删除成功')
      this.getRoles()
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      // console.log(res)
      this.companyInfo = res
    },
    // 点击让弹层显示
    async showRightsDialog(id) {
      this.roleId = id
      this.setRightsDialog = true
      // 拿到角色Id 根据ID获取详情
      const res = await getRolesInfo(id)
      console.log(res.permIds)
      this.defaultCheckKeys = res.permIds
    },
    // 获取权限列表
    async getpermissions() {
      const res = await getPermissionList()

      const treepermission = transListToTree(res, '0')
      this.permissions = treepermission
      // console.log(res)
    },
    setRightsClose() {
      // 让树形结构内容清空
      this.defaultCheckKeys = []
    },
    // 点击确定
    async onSaveRights() {
      // console.log(this.roleId);
      await assignPerm({
        id: this.roleId, //权限ID
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.setRightsDialog = false
    }
  }
}
</script>

<style scoped lang="less"></style>
