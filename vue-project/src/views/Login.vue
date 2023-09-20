<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Logowanie

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <div class="col-8 col-md-6 bg-body-tertiary  m-auto rounded shadow-lg ">
                
                <form class="needs-validation pb-3" novalidate> 
                    <div class="mb-3 mt-3 pt-3 ">
                        <div class="col-8 offset-2 form-floating ">
                            <input type="email" v-model="email" class="form-control" id="formEmail" placeholder="Podaj email" :class="{ 'is-invalid': errors.email }" required>
                            <label class="" for="formEmail">Podaj email</label>
                            <div class="invalid-feedback">
                                {{errors.email}}
                            </div>
                        </div>
                        <div class="col-8 mt-3 offset-2 form-floating ">
                            <input type="password" v-model="password" class="form-control" id="formPassword" placeholder="Podaj hasło" :class="{ 'is-invalid': errors.password }" required>
                            <label class="" for="formPassword">Podaj hasło</label>
                            <div class="invalid-feedback">
                                {{errors.password}}
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 mt-3 pt-3 ">
                        <input type="button" @click="login" class="btn btn-outline-success" value="Zaloguj"/>
                    </div>
                <div class="text-center pt-2">
                    Nie masz konta? <a class="" style="cursor: pointer;" @click="signup">Zarejestruj się! </a>
                </div>
                </form>
            </div>
            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="ToastDanger" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
                    <div class="toast-header">
                        <strong class="me-auto">Błąd</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Błędny email lub hasło 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script >
import axios from 'axios';
import { mapMutations } from 'vuex';
import { Toast } from 'bootstrap'
export default{
    name: 'Login',
    data(){
        return{
        email: '',
        password: '',
        errors: {},
        }
    },
    mounted(){
        document.title = 'Zaloguj się';
    },
    created(){
             // user is not authorized
                this.verifyToken();
        },
    methods:{
        
        async login(){
            this.errors = {};
            if (!this.email) {
                this.errors.email = 'Pole Email jest wymagane.';
            }
            if (!this.password) {
                this.errors.password = 'Pole Hasło jest wymagane.';
            }
            if (Object.keys(this.errors).length === 0) {
                console.log("git")
                let user = {
                    Email: this.email,
                    Password: this.password
                }
                try {
                    const response = await axios.post(this.$store.state.connectionString + 'user/login', user );
                    if(response.status === 200){
                        console.log(response)
                        localStorage.setItem('token',response.data);
                        this.$router.replace('/');
                        //localStorage.setItem('alertMessSuccess','You have logged in.');
                    }
                } catch (error) {
                    this.email = '';
                    this.password = '';
                    let toastDanger = new Toast(document.getElementById('ToastDanger'));
                    toastDanger.show();   
                    // console.log(error);
                }
            }
        },
        
        signup(){
            this.$router.push('/register');
        },
        ...mapMutations(['SET_IS_USER']),

            verifyToken(){
                axios.get(this.$store.state.connectionString + 'User/authAll',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }} ).then(res => {
                        // console.log(res)
                        this.$router.replace('/');
                    },err => {
                        // console.log(err.response.status);
                    });
            },
    }
}
</script>
<!-- // else{
    //     axios.post('http://localhost:5000/api/Auth/authenticate',user)
    //     .then(res => {
    //         //if successfull
    //         if(res.status === 200){
    //             console.log(res);
    //             localStorage.setItem('token',res.data.Token);
    //             if(res.data.Role == "Admin")
    //                 localStorage.setItem('tokenAdmin',res.data.Role);
    //             if(res.data.Role == "User")
    //                 localStorage.setItem('tokenUser',res.data.Role);
    //             //this.$store.state.nick = res.data.Login;
    //             //this.$store.state.mail = res.data.Email;
    //             localStorage.setItem('myLogin', res.data.Login);
    //             this.$router.push('/');
    //             localStorage.setItem('alertMessSuccess','You have logged in.');
    //         }
    //         console.log(res);
    //         this.error = '';
    //     },err => {
    //         console.log(err.response);
    //         this.error = err.response.data.message;
    //     })
    // } -->