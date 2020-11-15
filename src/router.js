import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [{
            path: '',
            component: () =>
                import ('./layouts/main/Main.vue'),
            children: [{
                    path: '/',
                    name: 'home',
                    component: () =>
                        import ('./views/Dashboard.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/page2',
                    name: 'page-2',
                    component: () =>
                        import ('./views/Page2.vue')
                },
                {
                    path: '/restaurant',
                    name: '/restaurant',
                    component: () =>
                        import ('./views/Profile.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/category',
                    name: 'category',
                    component: () =>
                        import ('./views/Category.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/food',
                    name: 'food',
                    component: () =>
                        import ('./views/Food.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/food/create',
                    name: 'food-create',
                    component: () =>
                        import ('./components/food/FoodCreate.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/food/edit/:id',
                    name: 'food-edit',
                    component: () =>
                        import ('./components/food/FoodEdit.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/table',
                    name: 'table',
                    component: () =>
                        import ('./views/Tables.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/waiter',
                    name: 'waiter',
                    component: () =>
                        import ('./views/Waiters.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/kitchen',
                    name: 'kitchen',
                    component: () =>
                        import ('./views/Kitchen.vue'),
                    beforeEnter: requireAuth
                },
                {
                    path: '/report',
                    name: 'Report',
                    component: () =>
                        import ('./views/Report.vue'),
                    beforeEnter: requireAuth
                }

            ],
        },
        {
            path: '',
            component: () =>
                import ('@/layouts/full-page/FullPage.vue'),
            children: [{
                    path: '/login',
                    name: 'login',
                    component: () =>
                        import ('@/views/pages/Login.vue')
                },
                {
                    path: '/error-404',
                    name: 'page-error-404',
                    component: () =>
                        import ('@/views/pages/Error404.vue')
                },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})


function requireAuth(to, from, next) {
    if (localStorage.token) {
        next();
    } else {
        window.location.href = "/login";
    }
}

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router