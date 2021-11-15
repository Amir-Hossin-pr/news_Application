import VueRouter from "vue-router"
import Vue from "vue"

Vue.use(VueRouter)

const routs = [] 

const router = new VueRouter({
  routs, 
  mode:"history"
})

export default router