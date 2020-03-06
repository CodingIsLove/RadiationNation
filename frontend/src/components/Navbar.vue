<template>
    <v-toolbar id="toolbar">
        <v-toolbar-title>Radiation Nation</v-toolbar-title>
           <v-spacer/>

        <v-btn icon >
            <v-icon>mdi-settings</v-icon>
        </v-btn>

        <v-btn icon >
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    #toolbar {
        height: 100px;
    }
</style>