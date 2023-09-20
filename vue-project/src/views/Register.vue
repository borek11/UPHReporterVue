<template>
  <div class="container-fluid">
      <div class="text-white text-center mt-2 mb-4 h2">
          Rejestracja
      </div>
      <div class="container bg-dark p-2 mb-5 text-center">
          <div class="col-8 col-md-6 bg-body-tertiary  m-auto rounded shadow-lg ">
              
              <form class="needs-validation pb-3" novalidate> 
                  <div class="mb-3 mt-3 pt-3 ">
                    <div class="col-8 offset-2 form-floating ">
                      <input type="text" v-model="firstName" class="form-control" id="formFirstName" placeholder="Podaj imię" required :class="{
                          'form-control is-invalid': !isValidFirstName && firstName !== '',
                          'form-control is-valid': isValidFirstName && firstName !== ''
                        }">
                          <label class="" for="formFirstName">Podaj imię</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawne imię (min 2 znaki)
                          </div>
                      </div>

                      <div class="col-8 mt-3 offset-2 form-floating ">
                        <input type="text" v-model="lastName" class="form-control" id="formLastName" placeholder="Podaj nazwisko" required :class="{
                            'form-control is-invalid': !isValidLastName && lastName !== '',
                            'form-control is-valid': isValidLastName && lastName !== ''
                          }">
                          <label class="" for="formLastName">Podaj nazwisko</label>
                          <div class="invalid-feedback text-start">
                            Niepoprawne nazwisko (min 2 znaki)
                          </div>
                      </div>
                      <div class="col-8 mt-3 offset-2 form-floating ">
                        <input type="email" v-model="email" class="form-control" id="formEmail" placeholder="Podaj email" required :class="{
                            'form-control is-invalid': !isValidEmail && email !== '',
                            'form-control is-valid': isValidEmail && email !== ''
                          }">
                          <label class="" for="formEmail">Podaj email</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawny email
                          </div>
                      </div>
                      <div class="col-8 mt-3 offset-2 form-floating ">
                        <input type="password" v-model="password" class="form-control" id="formPassword" placeholder="Podaj hasło" required :class="{
                            'form-control is-invalid': !isValidPassword && password !== '',
                            'form-control is-valid': isValidPassword && password !== ''
                          }">
                          <label class="" for="formPassword">Podaj hasło</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawne hasło: <br>
                              <div class="text-start">
                              * min 8 znaków <br>
                              * min 1 znak specjalny <br>
                              * min 1 cyfra <br>
                            </div>
                          </div>
                      </div>
                      <div class="col-8 mt-3 offset-2 form-floating ">
                        <input type="password" v-model="confirmPassword" class="form-control" id="formConfirmPassword" placeholder="Powtórz hasło" required :class="{
                            'form-control is-invalid': !isValidConfirmPassword && confirmPassword !== '',
                            'form-control is-valid': isValidConfirmPassword && confirmPassword !== ''
                          }">
                          <label class="" for="formConfirmPassword">Powtórz hasło</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawne hasło
                          </div>
                      </div>
                  </div>
                  <div class="mb-3 mt-3 pt-3 ">
                      <input type="button" @click="submitForm" class="btn btn-outline-primary" value="Dołącz"/>
                  </div>
              <!-- <div class="text-center pt-2">
                  Masz juz konto? <a class="" style="cursor: pointer;" @click="login">Zaloguj się! </a>
              </div> -->
              </form>
          </div>
      </div>
      <!-- Toast danger -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="ToastDangerRegister" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header">
                <strong class="me-auto">Błąd</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{error}}
            </div>
        </div>
      </div>  
      <!-- Toast success -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="ToastSuccessRegister" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header">
                <strong class="me-auto">Zarejestrowano</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Poprawnie zarejestrowano. Możesz się teraz zalogować.
            </div>
        </div>
      </div>  
  </div>
</template>
<script >
import axios from 'axios';
import AlertS from '../helpers/AlertS.js';
import { Toast } from 'bootstrap'

export default{
  name: 'Register',
  data(){
      return{
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',

      error: ''
      }
  },
  mounted(){
      document.title = 'Zarejestruj się';
  },
  created(){
          // user is not authorized
        if(localStorage.getItem('token') !== null){
            this.$router.replace('/');
            AlertS("error","Jesteś juz zalogowany!");
        }
    },
  computed: {
    isValidFirstName() {
      const regex = /^[a-zA-Z]{2,30}$/;
      return regex.test(this.firstName);
    },
    isValidLastName() {
      const regex = /^[a-zA-Z]{2,30}$/;
      return regex.test(this.lastName);
    },
    isValidEmail() {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(this.email);
    },
    isValidPassword() {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      return regex.test(this.password);
    },
    isValidConfirmPassword() {
      return this.password === this.confirmPassword;
    }
  },
  methods:{
    async submitForm() {
      if (
        this.isValidFirstName &&
        this.isValidLastName &&
        this.isValidEmail &&
        this.isValidPassword &&
        this.isValidConfirmPassword
      ) {
        let user = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Email: this.email,
            Password: this.password, 
            ConfirmPassword: this.confirmPassword
        };
          try {
              const response = await axios.post(this.$store.state.connectionString + 'user/register', user );
              if(response.status === 200){
                let toastSuccessRegister = new Toast(document.getElementById('ToastSuccessRegister'));
                toastSuccessRegister.show();   
                this.$router.replace('/');     
              }
          } catch (error) {
              this.clear();
              this.error = error.response.data;
              let toastDangerRegister = new Toast(document.getElementById('ToastDangerRegister'));
              toastDangerRegister.show();   
              console.log(error);
          }
      }
      else{
        this.error = "Uzupełnij wymagane pola!"
          let ToastFailRegister = new Toast(document.getElementById('ToastDangerRegister'));
          ToastFailRegister.show();   
      }
    },
    clear(){
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
      // login(){
      //     this.$router.push('/login');
      // }
  }
}
</script>
<style>
.error {
  color: rgba(255, 0, 0, 0.774);
}

.has-error .form-control {
  border-color: red;
}

.has-success .form-control {
  border-color: green;
}
</style>
