<template lang="pug">
  div(class="app")
    q-layout(view="hHh lpR fFf")
      q-header(elevated class="bg-primary text-white" height-hint="98")
        q-toolbar
          q-toolbar-title 
            To Do List {{(currentUser) ? '- Welcome '+currentUser.username : ''}}
        q-tabs
          q-route-tab(v-if="!currentUser" to="Login" label="Login")
          q-btn(v-else v-on:click.native="logout" label ="Log out")
          q-route-tab(to="TaskPage" label="Task")

      q-page-container
        q-page(style="background-color: white;")
          router-view


</template>

<script>
import { Meteor } from 'meteor/meteor';
import Login from "./pages/Login.vue";
import TaskPage from "./pages/TaskPage.vue";
import { TasksCollection } from "../db/TasksCollection";
import { QHeader, QToolbar, QToolbarTitle, QLayout, QList, QBtn, QTabs, QRouteTab, QPageContainer, QPage } from 'quasar';


import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.min.css";
 
export default {
  components: {
    TaskPage,
    Login,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QLayout,
    QList,
    QBtn,
    QTabs,
    QRouteTab,
    QPageContainer,
    QPage
  },
  data() {
    return {
      hideCompleted: false,
      currentUser : {}
    };
  },
  methods: {
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
      this.fetchTasks();
    },
    fetchTasks() {
      const hideCompletedFilter = { isChecked: { $ne: true } };
      const pendingOnlyFilter = { ...hideCompletedFilter };
      if(!this.hideCompleted) {
        this.tasks = TasksCollection.find().fetch();
      } else {
        this.tasks =  TasksCollection.find(
            pendingOnlyFilter,
            {
              sort: { createdAt: -1 },
            }
        ).fetch();
      }
    },

    logout() {
      Meteor.logout();
      this.$router.push('/Login');
    }
  },
  meteor: {
   
    currentUser() {
      return Meteor.user();
    }
  }
};
</script>

<style></style>