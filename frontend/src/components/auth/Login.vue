<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="primary" dark flat>
                                <v-toolbar-title>Radiation Nation Login</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form @submit.prevent="loginUser">
                                    <v-text-field
                                            v-model="login.email"
                                            label="Login"
                                            name="login"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            required
                                    />
                                    <v-text-field
                                            id="password"
                                            v-model="login.password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            required
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" @click="register">Register here!</v-btn>
                                <v-spacer/>
                                <v-btn color="primary"  @click="loginUser">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

    import swal from "sweetalert";

    export default {
        data(){
         return{
             login: {
                 email:"",
                 password:""
             }
         }
        },
        methods: {
            async loginUser(){
                try {
                    let response = await this.$http.post("api/user/login", this.login);
                    let token = response.data.token;
                    let user= response.data.user;
                    localStorage.setItem("jwt", token);
                    this.$store.commit('initializeUser',user);

                    if (token) {
                        await swal("Success", "Login Successful", "success");
                        await this.$router.push("/lobby");
                    }
                } catch (err) {
                    let error = err.response;
                    console.log(error);
                    await swal("Error",error.data.message , "error");
                }
            },
            register: function (){
                this.$router.push("/register");
            }
        }
    };
</script>

<style scoped>
    #inspire {
        background-image: url('~@/assets/login_image.jpg');
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
