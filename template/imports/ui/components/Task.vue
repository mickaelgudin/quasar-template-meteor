<template lang="pug">
  q-item(v-bind:class="taskClassName")
    input(type="checkbox" readOnly v-bind:checked="!!this.task.isChecked" @click="toggleChecked")
    
    span(class="text") {{ this.task.text }}
    q-btn(color="red" label="×" v-on:click.native="deleteThisTask" class="delete")
</template>

<script>
import { TasksCollection } from "../../db/TasksCollection";
import { Meteor } from 'meteor/meteor';
import { QBtn, QItem } from 'quasar';

export default {
  props: ["task"],
  components: {QBtn, QItem},
  data() {
    return {};
  },
  computed: {
    taskClassName: function() {
      return this.task.isChecked ? "checked" : "";
    }
  },
  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setIsChecked', this.task._id, !this.task.isChecked);
    },
    deleteThisTask() {
      Meteor.call('tasks.remove', this.task._id);
    }
  }
};
</script>
