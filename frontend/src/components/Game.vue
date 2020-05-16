<template>
    <v-app>
        <div>Welcome {{userName}}</div>
        <canvas>

        </canvas>
    </v-app>
</template>

<script>
export default {
  name: "Game",
    data:function () {
      return{

      }
    },
    computed:{
        userName(){
            return this.$store.state.user.username
        }
    },
    mounted(){
      console.log("mounted mounted mounted mounted")
    }
};
</script>

<style scoped></style>
