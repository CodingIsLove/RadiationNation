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
        <v-menu offset-y :close-on-click="false" :close-on-content-click="false" v-model="menuOpen">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="ma-4">
                    <v-icon>mdi-translate
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-actions>
                    <v-btn v-model="$i18n.locale" @click="changeLanguage('zh')">中文</v-btn>
                    <v-btn v-model="$i18n.locale" @click="changeLanguage('de')">Deutsch</v-btn>
                    <v-btn v-model="$i18n.locale" @click="changeLanguage('ch')">Schwiizerdütsch</v-btn>
                    <v-btn v-model="$i18n.locale" @click="changeLanguage('ru')">русский</v-btn>
                    <v-btn v-model="$i18n.locale" @click="changeLanguage('en')">English</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
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
            },
            changeLanguage:function(locale) {
                this.$i18n.locale = locale;
            }
        }
    }
</script>
