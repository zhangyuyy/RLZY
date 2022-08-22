import permission from '@/constant/permission'
export default {
    data() {
        return {
            point: permission
        }

    },
    methods: {
        // 封装权限
        isHas(point) {
            return this.$store.state.permission.points.includes(point)
        }
    }
}