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
                                <v-form >
                                    <v-text-field
                                            v-model="register.email"
                                            label="email"
                                            name="email"
                                            prepend-icon="mdi-mail"
                                            type="text"
                                            required
                                    />

                                    <v-text-field
                                            id="password"
                                            v-model="register.password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            required
                                    />

                                    <v-text-field
                                            id="username"
                                            v-model="register.username"
                                            label="Username"
                                            name="username"
                                            prepend-icon="mdi-alarm"
                                            type="text"
                                            required
                                    />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn color="primary" @click="registerUser">Register</v-btn>
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
             register: {
                 username:"",
                 email:"",
                 password:""
             }
         }
        },
        methods: {
            async registerUser(){
                try{
                    let response = await this.$http.post("/api/user/register", this.register);
                    console.log(response);
                    let token = response.data.token;
                    if(token){
                        localStorage.setItem("jwt",token);
                        await this.$router.push("/");
                        await swal("Success", "Registration Was succesfull", "success");
                    }else{
                        await swal("Error","Something Went Wrong","error");
                    }
                }catch (err) {
                    let error = err.response;
                    if (error.status === 409) {
                        await swal("Error", error.data.message, "error");
                    } else {
                        await swal("Error", error.data.message, "error");
                    }
                }
            }
        }
    };
</script>

<style scoped>
    #inspire {
        background-image: url("~@/assets/login_image.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
</style>
