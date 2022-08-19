<template>
  <div>
    <i
      @click="$router.push('/employees/print?type=job')"
      class="el-icon-printer"
    ></i>
  </div>
</template>
<script>
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
