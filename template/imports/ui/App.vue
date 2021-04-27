<template lang="pug">
  div(class="app")
    q-layout(view="lHh lpr lFf" container style="height: 100px" class="shadow-2 rounded-borders")
      q-header(elevated)
        q-toolbar
          q-toolbar-title 
            To Do List {{incompleteCount > 0 ? incompleteCount : ''}}
          
    div(class="main")
      <template v-if="currentUser">
        div(class="user" v-on:click="logout") {{currentUser.username}} log out

        TaskForm

        div(class="filter")
          q-btn(:label="(hideCompleted) ? 'Show All' : 'Hide Completed Tasks'" v-model="hideCompleted" v-on:click.native="toggleHideCompleted")
          
        div(class="loading" v-if="!$subReady.tasks") Loading...

        q-list(bordered separator)
          Task( class="task" v-for="task in tasks" v-bind:key="task._id" v-bind:task="task")
          
      </template>

      <template v-else>
        LoginForm
      </template>
</template>

<script>
import Vue from "vue";
import { Meteor } from 'meteor/meteor';
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";
import LoginForm from "./components/LoginForm";
import { TasksCollection } from "../db/TasksCollection";
import { QHeader, QToolbar, QToolbarTitle, QLayout, QList, QBtn } from 'quasar';

export default {
  components: {
    Task,
    TaskForm,
    LoginForm,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QLayout,
    QList,
    QBtn
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
    }
  },
  meteor: {
    $subscribe: {
      'tasks': []
    },
    tasks() {
      const hideCompletedFilter = { isChecked: { $ne: true } };

      const pendingOnlyFilter = { ...hideCompletedFilter };

      if(!this.hideCompleted) {
        return TasksCollection.find().fetch();
      }
      
      return TasksCollection.find(
          pendingOnlyFilter,
          {
            sort: { createdAt: -1 },
          }
      ).fetch();
    },
    incompleteCount() {
      return TasksCollection.find({ isChecked: { $ne: true }, userId: this.currentUser._id }).count();
    },
    currentUser() {
      return Meteor.user();
    }
  }
};
</script>

<style></style>