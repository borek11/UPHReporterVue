

<template>

<!-- modal start -->
  <div class="modal fade" id="modalLogin" ref="modalLogin" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header ">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Logowanie</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row pb-5">
                            <div class="col-12 text-center">
                              <!-- form start -->
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
                                    <input type="button" :disabled="!isButtonActive" @click="login" class="btn btn-outline-success " value="Zaloguj"/>
                                </div>
                                <div class="text-center pt-2">
                                    Nie masz konta? <a class="" style="cursor: pointer;" @click="signup">Zarejestruj się! </a>
                                </div>
                              </form>
                              
                              <!-- form end -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </div>

<!-- modal end -->

<!-- toast login -->
<div class="toast-container position-fixed bottom-0 end-0 p-3 ">
      <div id="loginToast" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="toast-header">
              <strong class="me-auto">Zalogowano</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
              Poprawnie zalogowano
          </div>
      </div>
  </div>
<!-- toast login -->

<!-- toast loginWaiter -->
<div class="toast-container position-fixed bottom-0 end-0 p-3 ">
      <div id="loginToastWait" class="toast text-bg-secondary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="toast-header">
              <strong class="me-auto">Weryfikacja</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Ładowanie...</span>
            </div>
          </div>
      </div>
  </div>
<!-- toast loginWaiter -->

<!-- toast logout -->
<div class="toast-container position-fixed bottom-0 end-0 p-3 ">
      <div id="logoutToast" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
          <div class="toast-header">
              <strong class="me-auto">Wylogowano</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div class="toast-body">
              Poprawnie wylogowano
          </div>
      </div>
  </div>
<!-- toast logout -->

<!-- toast error -->
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
<!-- toast error -->

<!-- toast error Role -->
<div class="toast-container position-fixed bottom-0 end-0 p-3 ">
    <div id="ToastWarning" class="toast text-bg-warning" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
        <div class="toast-header">
            <strong class="me-auto">Blokada</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Konto zablokowane. Skontaktuj się z administratorem systemu. 
        </div>
    </div>
</div>
<!-- toast error -->
  <header>

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ms-2 ps-0 ps-lg-5 ms-lg-5  me-2 pe-0 pe-lg-5 me-lg-5">
    <a class="navbar-brand" > <RouterLink class=" custom-link" to="/"> HOME </RouterLink> </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#"><RouterLink to="/test">About</RouterLink></a>
        </li> -->
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li> -->

        <li v-if="isUser" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Linki
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item"><RouterLink class="custom-link" to="/searcherLinks"> Szukaj </RouterLink></a></li>
            
            <li><a class="dropdown-item"> <RouterLink class="custom-link" to="/linksFound"> Wyszukane </RouterLink> </a></li>
          </ul>
        </li>
        
        <li v-if="isUser" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            PSI
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/generatePsi"> Generuj </RouterLink> </a></li>
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/reportsPsi"> Raporty </RouterLink> </a></li>
          </ul>
        </li>
        
        <li v-if="isUser" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Wave
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/generateWave"> Generuj </RouterLink> </a></li>
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/reportsWave"> Raporty </RouterLink> </a></li>
            <!--admin only -->
            <li v-if="isAdmin"><hr class="dropdown-divider"></li>
            <li v-if="isAdmin"><a class="dropdown-item" href> <RouterLink class="custom-link" to="/waveKey"> Dodaj klucz </RouterLink> </a></li>
          </ul>
        </li>

        <!-- admin only -->
        <li v-if="isAdmin" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Użytkownicy
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/manageUsers"> Zarządzaj </RouterLink> </a></li>

            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/reportsUsersPsi"> Raporty PSI </RouterLink> </a></li>
            <li><a class="dropdown-item" > <RouterLink class="custom-link" to="/reportsUsersWave"> Raporty Wave </RouterLink> </a></li>
          </ul>
        </li>


      </ul>
      <div class="collapse navbar-collapse d-flex justify-content-end me-2" id="navbarNav">
        <ul v-if="!isUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <!-- <a class="nav-link" href="/login"> -->
            <a class="nav-link custom-link" @click="showModal()">
              <i class="bi bi-person-circle me-2"></i>
              Zaloguj
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" > <RouterLink class="custom-link" to="/register">
              <i class="bi bi-person-plus me-2"></i>
              Dołącz
            </RouterLink>
            </a>
          </li>
        </ul>
        <ul v-else class="navbar-nav ml-auto">
          

          <li v-if="isUser" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profil
            <i class="bi bi-person"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item"><RouterLink class="custom-link" to="/myProfile"> Zarządzaj  
              <i class="bi bi-gear-fill"></i>
            </RouterLink></a></li>
            <li>
              <a class="dropdown-item custom-link" @click="logout">
              
              Wyloguj
              <i class="ms-1 bi bi-box-arrow-right"></i>
              </a>
            </li>
          </ul>
        </li>


          <li class="nav-item">

          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
    
  </header>


  <RouterView />

</template>

<script >
import { mapState, mapMutations } from 'vuex';
import { Modal } from 'bootstrap'
import axios from 'axios'
import { Toast } from 'bootstrap'
export default{
  data(){
    return{
      isToken: '',
      email: '',
      password: '',
      errors: {},
      modalLogin: null,
      isButtonActive: true,
      
    }
  },
  mounted(){
      if(localStorage.getItem('token') === null){
        // this.isToken = false;
        this.SET_IS_USER(false);
        this.SET_IS_ADMIN(false);
      }
      else{
        // this.isToken = true;
        this.verifyTokenAll();
        this.verifyAdmin();
      }
  },
  watch:{

  },
  computed: {
    ...mapState(['isUser']),
    ...mapState(['isAdmin']),
  },
  methods:{
    verifyTokenAll(){
      axios.get(this.$store.state.connectionString + 'User/authAll',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
          }} ).then(res => {
              // console.log(res)
              this.SET_IS_USER(true);
          },err => {
              // console.log(err.response.status);
              localStorage.clear();
              this.SET_IS_USER(false);
          });
    },
    verifyAdmin(){
      axios.get(this.$store.state.connectionString + 'User/authAdmin',{headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
          }} ).then(res => {
              // console.log(res)
              this.SET_IS_ADMIN(true);
          },err => {
              // console.log(err.response.status);
              this.SET_IS_ADMIN(false);
          });
    },
    ...mapMutations(['SET_IS_USER']),
    ...mapMutations(['SET_IS_ADMIN']),

    showModal(){
        this.modalLogin = new Modal(document.getElementById('modalLogin'));
        this.modalLogin.show();
    },
    loadingToast(){
      
    },
    hideModal(){
        this.modalLogin.hide();
    },
    clear(){
      this.email = '';
      this.password = '';
      this.errors = '';
    },
    logout(){
      localStorage.clear();
      this.SET_IS_USER(false);
      this.SET_IS_ADMIN(false);
      let successfull = new Toast(document.getElementById('logoutToast'));
      successfull.show();  
      this.$router.replace('/')
    },
    async login(){
        this.errors = {};
        if (!this.email) {
            this.errors.email = 'Pole Email jest wymagane.';
        }
        if (!this.password) {
            this.errors.password = 'Pole Hasło jest wymagane.';
        }
        if (Object.keys(this.errors).length === 0) {
          let loading = new Toast(document.getElementById('loginToastWait'));
          loading.show();
          this.isButtonActive = false;
            let user = {
                Email: this.email,
                Password: this.password
            }
            try {
                const response = await axios.post(this.$store.state.connectionString + 'user/login', user );
                if(response.status === 200){
                    localStorage.setItem('token',response.data);
                    this.SET_IS_USER(true);
                    this.verifyAdmin();
                    this.hideModal();
                    let successfull = new Toast(document.getElementById('loginToast'));
                    successfull.show();  
                    this.clear();
                    this.$router.replace('/');
                    //localStorage.setItem('alertMessSuccess','You have logged in.');
                }
            } catch (error) {
            console.log(error.response.data)
            if(error.response.data == "Konto zablokowane"){
              let toastDanger = new Toast(document.getElementById('ToastWarning'));
                toastDanger.show();   
                this.hideModal();
            }
            else{
              let toastDanger = new Toast(document.getElementById('ToastDanger'));
                toastDanger.show();   
            }
                this.email = '';
                this.password = '';
                // console.log(error);
            }
            loading.hide();
            this.isButtonActive = true;
        }
        },
        signup(){
            this.hideModal();
            this.$router.push('/register');
        }
  },
}
</script>
<style>
.custom-link {
  text-decoration: none; /* Usunięcie podkreślenia */
  color: #a0b5af; /* Kolor szary */
  cursor: pointer; /* Zmiana kursora na pointer */
}
.custom-link:hover{
  color: #ffffff; /* Kolor szary */
}
</style>