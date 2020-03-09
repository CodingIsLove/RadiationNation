<template>
    <v-toolbar id="toolbar">
        <v-toolbar-title>Radiation Nation</v-toolbar-title>
           <v-spacer/>
        <v-btn icon @click="lobbyRoute">
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn icon @click="gameRoute" >
            <v-icon>mdi-gamepad</v-icon>
        </v-btn>
        <v-btn icon >
            <v-icon>mdi-settings</v-icon>
        </v-btn>
        <v-btn icon @click="loginRoute" >
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Navbar",
        methods:{
            gameRoute:function () {
                this.$router.push({path:'/game'})
            },
            lobbyRoute:function () {
                this.$router.push({path:'/lobby'})
            },
            loginRoute:function () {
                this.$router.push({path:'/'})
            }
        }
    }
</script>

<style scoped>
    #toolbar {
        height: 100px;
    }
</style>