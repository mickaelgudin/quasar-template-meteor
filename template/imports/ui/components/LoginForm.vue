<template lang="pug">
  q-form(class="login-form" @submit.prevent="handleSubmit")
    div
      q-input(outlined placeholder="Username" v-model="username" required)
     
    div
      q-input(outlined placeholder="Password" v-model="password" required)
      
    div
      q-btn(type="submit" label="Log In")
</template>

<script lang="ts">
import { Meteor } from 'meteor/meteor';
import { QForm, QInput, QBtn } from 'quasar';
import {
  Component,
  Provide
} from "vue-property-decorator";

@Component({
  components: {QForm, QInput, QBtn}
})
export default class LoginForm extends Vue {
  @Provide("username") username:string = ""
  @Provide("password") password:string = ""
  
  handleSubmit(event) {
    Meteor.loginWithPassword(this.username, this.password);
    Meteor.user();
    this.$router. push('/TaskPage');
  }
}
</script>