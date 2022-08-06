<template>
  <div>首页</div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '章三', id: 1, pid: 0 },
        { name: '章三三', pid: 1, id: 2 },
        { name: '里斯', id: 3, pid: 0 },
        { name: '里斯斯', id: 4, pid: 3 },
      ],
    }
  },

  created() {
    const tree = this.transListToTree(this.list)
    console.log(tree)
  },

  methods: {
    transListToTree(data) {
      const arr = []
      return arr
    },
  },
}
</script>

<style scoped></style>
