<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>
<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    // 上传前处理
    excelSuccess({ name }) {
      console.log(name)
      // endsWith结尾开始是否一样，一致true,相反false
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    // 上传成功
    async onSuccess({ header, results }) {
      // 先用map循环拿到对应的空数据
      const newArr = results.map((item) => {
        const obj = {}
        // 在用for in 去循环每一项把
        for (let key in importMapKeyPath) {
          // 优化时间
          if (key === '入职时间' || key === '转正日期') {
            // excel 时间戳
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
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
