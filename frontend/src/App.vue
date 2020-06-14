<template>
    <div id="app">
        <v-app id="v-app">
            <v-main id="v-main">
                <v-container id="main-container" fluid>
                    <router-view/>
                </v-container>
            </v-main>
        </v-app>
    </div>
</template>

<script>
    export default {
        name: "App",
    };
</script>

<style scoped>
    #main-container{
        padding: 0;
        margin: 0;
    }
</style>


