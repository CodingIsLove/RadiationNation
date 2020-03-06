<template>
  <v-app>
    <v-content>
      <LoginView></LoginView>
    </v-content>
  </v-app>
</template>

<script>
import LoginView from "./views/LoginView";

export default {
  name: "App",

  components: {
    LoginView
  },

  data: () => ({
    //
  })
};
</script>
