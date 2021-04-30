import Vue from 'vue'
import '../imports/ui/plugins'
import { Meteor } from 'meteor/meteor'
import App from '../imports/ui/App.vue'

import VueMeteorTracker from 'vue-meteor-tracker';

import VueRouter from "vue-router";
import Login from "../imports/ui/pages/Login.vue";
import TaskPage from "../imports/ui/pages/TaskPage.vue";

Vue.use(VueMeteorTracker);

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Login, name: "/"},
    {path: '/Login', component: Login, name: "/Login"},
    {path: '/TaskPage', component: TaskPage, name: "/TaskPage"}
]

const router = new VueRouter({
    routes: routes,
    base: '/Login'
})

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
    router
  })
})
