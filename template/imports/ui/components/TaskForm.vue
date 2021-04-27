<template lang="pug">
  q-form(@submit.prevent="handleSubmit")
    q-input(outlined placeholder="Type to add new tasks" v-model="newTask")
 
    q-btn(style="color: black" label="Add Task" type="submit")
</template>

<script lang="ts">
import Vue from "vue";
import { Meteor } from 'meteor/meteor';
import { TasksCollection } from "../../db/TasksCollection";
import { QForm, QInput, QBtn } from 'quasar';
import {
  Component,
  Provide
} from "vue-property-decorator";

@Component({
  components: {QForm, QInput, QBtn}
})
export default class TaskForm extends Vue {
  @Provide("newTask") newTask:string = ""
  
  handleSubmit(event) {
    if (this.newTask.length === 0) return;

    Meteor.call('tasks.insert', this.newTask.trim());

    // Clear form
    this.newTask = "";
  }
}
</script>