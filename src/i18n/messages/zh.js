import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
    name: '中文',
    dashboard: {
        calendar: '工作日历',
        progress: '流程申请'
    },
    ...zhLocale,// 或者用 Object.assign({ message: '你好' }, zhLocale)
    route: {
        首页: "首页",
        员工: '员工',
        审批: '审批',
        组织架构: '组织架构',
        考勤: '考勤',
        权限管理: '权限管理',
        工资: '工资',
        公司设置: '公司设置',
        社保: '社保'
    }
}