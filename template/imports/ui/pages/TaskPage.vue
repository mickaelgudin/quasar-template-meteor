<template lang="pug">
    div
        div(v-if="!currentUser")
            h2 Please login to see all tasks
 
        div(v-else)
            TaskForm

            div(class="filter")
                q-btn(:label="(hideCompleted) ? 'Show All' : 'Hide Completed Tasks'" v-model="hideCompleted" v-on:click.native="toggleHideCompleted")
                
            div(class="loading" v-if="!$subReady.tasks") Loading...

            q-list(bordered separator)
                Task( class="task" v-for="task in tasks" v-bind:key="task._id" v-bind:task="task")
</template>

<script>
import { QList, QBtn } from 'quasar';
import TaskForm from "../components/TaskForm.vue";
import Task from "../components/Task.vue";
import { TasksCollection } from "../../db/TasksCollection";

export default {
    components: {
        QList,
        QBtn,
        TaskForm,
        Task
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
      
      return TasksCollection.find(pendingOnlyFilter,{sort: { createdAt: -1 } } ).fetch();
    },
    incompleteCount() {
      return TasksCollection.find({ isChecked: { $ne: true }, userId: this.currentUser._id }).count();
    },
    currentUser() {
      return Meteor.user();
    }
  }
} 
</script>