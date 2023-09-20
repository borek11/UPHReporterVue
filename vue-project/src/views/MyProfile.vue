<template>
  <div class="container-fluid">
      <div class="text-white text-center mt-2 mb-4 h2">
          Moje konto
      </div>
      <div class="container bg-dark p-2 mb-5 text-center">
          <div class="col-8 col-md-6 bg-body-tertiary  m-auto rounded shadow-lg ">
              <p class="pt-3 fs-4">Dane ogólne</p>
              <form class="needs-validation pb-3" novalidate> 
                  <div class="mb-3 mt-3 pt-3 ">
                    <div class="col-8 mt-3 offset-2 form-floating ">
                          <input type="email" v-model="User.email" class="form-control " disabled id="formEmailAccount" placeholder="Email" >
                          <label class="" for="formEmailAccount">Email</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawny email
                          </div>
                      </div>
                    <div class="col-8 mt-3 offset-2 form-floating ">
                          <input type="text" v-model="User.firstName" class="form-control" id="formFirstName" placeholder="Imię" required :class="{'form-control is-invalid': !isValidFirstName}">
                          <label class="" for="formFirstName">Imię</label>
                          <div class="invalid-feedback text-start">
                              Niepoprawne imię (min 2 znaki)
                          </div>
                      </div>

                      <div class="col-8 mt-3 offset-2 form-floating ">
                          <input type="text" v-model="User.lastName" class="form-control " id="formLastName" placeholder="Nazwisko" required :class="{'form-control is-invalid': !isValidLastName}">
                          <label class="" for="formLastName">Nazwisko</label>
                          <div class="invalid-feedback text-start">
                            Niepoprawne nazwisko (min 2 znaki)
                          </div>
                      </div>

                      <div class="col-8 mt-3 offset-2 form-floating ">
                          <input type="date" v-model="User.dateOfBirth" class="form-control " id="formDateOfBirth" placeholder="Data urodzenia">
                          <label class="" for="formDateOfBirth">Data urodzenia</label>
                          <div class="invalid-feedback text-start">
                            Niepoprawna data
                          </div>
                      </div>
                  </div>
                  <div class="mb-3 mt-3 pt-3 ">
                      <input type="button" @click="submitForm" class="btn btn-outline-success" value="Zapisz"/>
                  </div>

              <!-- <div class="text-center pt-2">
                  Masz juz konto? <a class="" style="cursor: pointer;" @click="login">Zaloguj się! </a>
              </div> -->
              </form>
              <hr>
              <p class="pt-3 fs-4">Zmiana hasła</p>
              <form class="needs-validation pb-3" novalidate>
                <div class="col-8 mt-3 offset-2 form-floating ">
                    <input type="password" v-model="Password.oldPassword" class="form-control" id="formOldPassword" placeholder="Podaj stare hasło">
                    <label class="" for="formOldPassword">Podaj stare hasło</label>
                    <div class="invalid-feedback text-start">
                        Niepoprawne hasło
                    </div>
                </div>
                <div class="col-8 mt-3 offset-2 form-floating ">
                    <input type="password" v-model="Password.password" class="form-control" id="formPasswordAccount" placeholder="Podaj nowe hasło" required :class="{
                        'form-control is-invalid': !isValidPassword && Password.password !== '',
                        'form-control is-valid': isValidPassword && Password.password !== ''}">
                    <label class="" for="formPasswordAccount">Podaj nowe hasło</label>
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
                    <input type="password" v-model="Password.confirmPassword" class="form-control" id="formConfirmPassword" placeholder="Powtórz hasło" required :class="{
                      'form-control is-invalid': !isValidConfirmPassword && Password.confirmPassword !== '',
                      'form-control is-valid': isValidConfirmPassword && Password.confirmPassword !== ''}">
                    <label class="" for="formConfirmPassword">Powtórz hasło</label>
                    <div class="invalid-feedback text-start">
                        Niepoprawne hasło
                    </div>
                </div>
                <div class="mb-3 mt-3 pt-3 ">
                      <input type="button" @click="submitFormPassword" class="btn btn-outline-success" value="Zmień Hasło"/>
                  </div>
              </form>
          </div>
      </div>
      <!-- Toast danger -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
        <div id="ToastDangerUpdate" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
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
        <div id="ToastSuccessUpdate" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
            <div class="toast-header">
                <strong class="me-auto">Zaktualizowano</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ message }}
            </div>
        </div>
      </div>  
  </div>
</template>
<script >
import axios from 'axios';
import AlertS from '../helpers/AlertS.js';
import { Toast } from 'bootstrap'
import moment from 'moment';
import { mapMutations } from 'vuex';
export default{
  name: 'myProfile',
  data(){
      return{
      User:{
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
      },

      Password:{
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      error: '',
      message: '',
      }
  },
  mounted(){
      document.title = 'Moje konto';
      this.getData();
  },
  created(){
          // user is not authorized
      if(localStorage.getItem('token') === null){
            this.$router.replace('/');
            AlertS("error","Dostęp tylko dla autoryzowanych użytkowników!");
        }
      else{
          this.verifyToken();
      }
    },
  computed: {
    isValidFirstName() {
      const regex = /^[a-zA-Z]{2,30}$/;
      return regex.test(this.User.firstName);
    },
    isValidLastName() {
      const regex = /^[a-zA-Z]{2,30}$/;
      return regex.test(this.User.lastName);
    },
    isValidDateOfBirth() {
    //   console.log(this.dateOfBirth)
    //   if(this.dateOfBirth == null || this.dateOfBirth == '')
    //     return true
    // const minDate = new Date('01-01-1900');
    // const maxDate = new Date('01-01-2010');
    // const inputDate = new Date(this.dateOfBirth);

    // return inputDate >= minDate && inputDate < maxDate;
    return true;
    },
    isValidPassword() {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      return regex.test(this.Password.password);
    },
    isValidConfirmPassword() {
      return this.Password.password === this.Password.confirmPassword;
    }
  },
  methods:{
    ...mapMutations(['SET_IS_USER']),
      verifyToken(){
          axios.get(this.$store.state.connectionString + 'User/authAll',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
              }} ).then(res => {
                  // console.log(res)
              },err => {
                  // console.log(err.response.status);
                  localStorage.clear();
                  this.SET_IS_USER(false);
                  this.$router.replace('/');
              });
      },
    async getData(){
      try{
        let response = await axios.get(this.$store.state.connectionString + 'user', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
        this.User = response.data;  
        this.User.dateOfBirth = moment(this.User.dateOfBirth).format('YYYY-MM-DD');      
      }catch(error){
          console.log(error)
      }
    },
    async submitForm() {
      if (
        this.isValidFirstName &&
        this.isValidLastName && 
        this.isValidDateOfBirth
      ) {
        try {
            const response = await axios.put(this.$store.state.connectionString + 'user/personal', this.User, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}} );
            if(response.status === 200){
              this.message = "Poprawnie zmieniono dane.";
              let ToastSuccessUpdate = new Toast(document.getElementById('ToastSuccessUpdate'));
              ToastSuccessUpdate.show();   
              console.log("OK")
            }
        } catch (error) {
            this.error = error.response.data;
            let ToastFailUpdate = new Toast(document.getElementById('ToastDangerUpdate'));
            ToastFailUpdate.show();   
            console.log(error);
        }
      }else{
        this.error = "Uzupełnij wymagane pola!"
          let ToastFailUpdate = new Toast(document.getElementById('ToastDangerUpdate'));
          ToastFailUpdate.show();   
      }
    },
    async submitFormPassword(){
      if(
        this.isValidPassword &&
        this.isValidConfirmPassword &&
        this.oldPassword != ''
      ){
        try {
          const response = await axios.put(this.$store.state.connectionString + 'user/password', this.Password, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}} );
            if(response.status === 200){
              this.message = "Poprawnie zaktualziowano dane.";
              let ToastSuccessUpdate = new Toast(document.getElementById('ToastSuccessUpdate'));
              ToastSuccessUpdate.show();   
              console.log("OK")
            }
        } catch (error) {
          this.error = error.response.data;
          let ToastFailUpdate = new Toast(document.getElementById('ToastDangerUpdate'));
          ToastFailUpdate.show();   
          console.log(error)
        }
      }
      else{
          this.error = "Uzupełnij wymagane pola!"
          let ToastFailUpdate = new Toast(document.getElementById('ToastDangerUpdate'));
          ToastFailUpdate.show();   
      }
    },
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
