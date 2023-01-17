import { createRouter, createWebHistory, useRoute } from "vue-router";
import sourceData from "@/data.json";
//Home is not lazyloaded, we want the initial page loaded as on initial render
import Home from "@/views/HomeView.vue";

//ROUTE RECORDS
const routes = [
    {
      path: "/",
      alias: ['/index.html'],
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (homeview.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      //DYNAMIC ROUTE
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
    },
    {
      //test page
      path: "/cukrovinky/:id",
      name: "choco.show",
      // next comment inside function is so-called magic comment
      component: () => import(/* webpackChunkName: "brazil" */ "../views/CokoRoute.vue")
    }
  ];

//ROUTER INSTANCE WITH HTML5 HISTORY MODE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //LinkActiveClass == the class that will mark active page. 
  linkActiveClass: 'sweet-active-link',
  routes, //ROUTE RECORDS USED HERE
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

//EXPORT ROUTER INSTANCE
export default router;
