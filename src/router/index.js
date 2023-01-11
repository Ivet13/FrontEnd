import { createRouter, createWebHistory, useRoute } from "vue-router";
import sourceData from "@/data.json";

const routes = [
    {
      path: "/",
      alias: ['/index.html'],
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (homeview.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/pictures",
      name: "pictures",
      component: () => import("../views/Pictures.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/test/:id/:slug",
      name: "destination.show",
      component: () => import("../views/DestinationShow.vue"),
      props: route => ({ ...route.params, id: parseInt(route.params.id) }),
      beforeEnter(to, from) {
        const exists = sourceData.destinations.find(
          destination => destination.id === parseInt(to.params.id)
        )
        if (!exists) return {
          name: "NotFound",
          //allows keeping the URL while rendering a different page
          params: { pathMatch: to.path.split('/').slice(1) },
          query: to.query,
          hash: to.hash

        }
      },
      children: [
        {
          path: 'experienceSlug',
          name: 'experience.show',
          component: () => import('@/views/ExperienceShow.vue'),
          props: route => ({ ...route.params, id: parseInt(route.params.id) }),
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),

    },
    {
      path: "/about", 
      name: "About", 
      component: () => import("../views/About.vue"), 
    }
  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'sweet-active-link',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0 }), 1000)
    })
  }
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    // needs to login if not already logged in
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router;
