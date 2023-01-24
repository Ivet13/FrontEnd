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
      //ROUTE META FIELDS example
      path: "/pictures",
      name: "pictures",
      component: () => import("../views/Pictures.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      //DEPRECATED - surpassed by /pictures
      path: "/protected",
      name: "protected",
      component: () => import("../views/Protected.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/protected",
      name: "protected",
      component: () => import("../views/Protected.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {
      //DYNAMIC ROUTE
      path: "/test/:id/:slug",
      name: "destination.show",
      component: () => import("../views/DestinationShow.vue"),
      //casting id from URL to integer via props
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
      path: "/cukrovinky/:id/:slug",
      name: "choco.show",
      // next comment inside function is so-called magic comment
      component: () => import(/* webpackChunkName: "brazil" */ "../views/CokoRoute.vue"),
      props: route => ({id: parseInt(route.params.id)}),
      //NAVIGATION GUARDS - checks if the route that is served even exists
      beforeEnter(to, from) {
        const exists = sourceData.destinations.find(
          destination => destination.id === parseInt(to.params.id)
        )
        //If there is no route as in defined data.json file, route will be redirected to 404
        if (!exists) return {
          name: "NotFound",
          //allows keeping the URL while rendering a different page
          params: { pathMatch: to.path.split('/').slice(1) },
          query: to.query,
          hash: to.hash

        }
      },
      //NESTED ROUTE
      children:[
        {
          // path: '/cukrovinky/:id/:slug/:experienceSlug',
          path: ':experienceSlug',
          name: 'experience.show',
          // component: () => import('@/views/ExperienceShow.vue'),
          component: () => import('@/views/ExperienceShow.vue'),
          //we send all the possible child routes to the child template by SPREAD OPERATOR
          props: route => ({ ...route.params, id: parseInt(route.params.id)}),
        }
      ]
    }
  ];

//ROUTER INSTANCE WITH HTML5 HISTORY MODE
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //LinkActiveClass == the class that will mark active page. 
  linkActiveClass: 'sweet-active-link',
  //ROUTE RECORDS USED HERE
  routes, 
  //SCROLL BEHAVIOUR - Handles position of a scroll when navigating on our routed pages
  scrollBehavior(to, from, savedPosition) {
    // return {top: null, left:null, behavior:null}
    return savedPosition || new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0 }), 1000) //we set the jump to the top of the page, with timeout
    })
  }
})

//GLOBAL NAVIGATION GUARD
//CHECK FOR ATTACHED ARBITRARY INFORMATION TO A ROUTE-LIKE META FIELDS/PROTECTED PAGES
//BEFORE EXPORTING THE ROUTER THIS FUNCTION WILL RUN
router.beforeEach((to, from) => {
  //window.user is set in 'login.vue' in authentification method
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
