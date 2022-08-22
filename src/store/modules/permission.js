import router, { constantRoutes, asyncRoutes } from "@/router";
export default {
    namespaced: true,
    state: {
        routes: [],//我们自己维护的路由规则，所有路由规则（静态路由+筛选后的动态路由）
        points: []
    },
    mutations: {
        setRoutes(state, routes) {
            state.routes = [...constantRoutes, ...routes]
        },
        setpoints(state, payload) {
            state.points = payload
        }
    },
    actions: {
        filterRoutes(context, roles) {
            const routes = asyncRoutes.filter((item) => {
                // 如果权限标识在roles.menus,有这个权限返回true
                // 如果不在，没有这个权限返回false
                return roles.menus.includes(item.meta.id)
            })
            context.commit('setRoutes', routes)
            //怎么动态添加路由规则
            // console.log(routes);
            router.addRoutes([
                ...routes,
                { path: '*', redirect: '/404', hidden: true },
            ]);

        },
        setpoionsAction(context, points) {
            context.commit('setpoints', points)

        }

    }

}