<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Klucze API Wave

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <easy-data-table 
                :headers="headers" 
                :items="items" 
                :rows-items=rowsItem 
                :theme-color=themeColor
                :buttons-pagination=true 
                show-index 
                header-text-direction="center" 
                body-text-direction="center"
                table-class-name="customize-table" 
                :loading=loadingFromDB 
            >

                <!-- <template #item-operation="{ teamName, teamUrl }">
                <a :href="teamUrl">{{ teamName }}</a>
            </template> -->
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <i @click="showDeletePrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Usuń klucz" class="bi bi-trash-fill iconStyleDelete"></i>
                    </div>
                </template>
            </easy-data-table>
        </div>
        <h3 class="m-5 text-center"> Dodaj klucz </h3>
        <div class="col-12 col-md-5 bg-body-tertiary  m-auto rounded shadow-lg ">
            <div class="row input-size-sm mt-2">
                <div class="col-6 m-3 ms-5 form-floating ">
                    <input type="text"  v-model="keyForm" class="form-control" id="formKey" placeholder="Podaj Klucz" required>
                    <label class="ms-3" for="formKey">Podaj Klucz</label>
                    <div id="KeyError" class="invalid-feedback">
                        Klucz musi mieć minimum 1 znak
                    </div>
                </div>
            </div>
            <div class="pb-4 mt-3 ms-5 me-5 text-center">
                <input type="button" @click="validateForm" class="btn btn-outline-success" value="Dodaj"/>
            </div>
        </div>  
        <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
            <div id="successToast" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true" >
                <div class="toast-header">
                    <strong class="me-auto">Zapisano...</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    Dodano nowy klucz
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import PromptDelete from '../helpers/PromptDeleteApiWave.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Toast } from 'bootstrap'
import { Tooltip } from 'bootstrap'
import AlertS from '../helpers/AlertS.js';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            rowsItem: [10, 25, 50, 75, 100],
            themeColor: '#42b883',
            loadingFromDB: true,
            keyForm: '',
            headers: [
                { text: "Klucz", value: "apiKey", sortable: true},
                { text: "Ilość", value: "creditsRemaining", sortable: true },
                { text: "Operacje", value: "operation" },
            ],
            items: [],
        }
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
    mounted() {
        this.getAllKeys();
        document.title = 'Klucze API Wave';
        new Tooltip(document.body, {
                selector: "[data-bs-toggle='tooltip']",
        });

    },
    methods: {
        showDeletePrompt(item){
            PromptDelete(() => this.deleteItem(item), "Klucz został usunięty");
        },
        validateForm() {
            if (this.keyForm.length < 1) {
                const invalidFeedback = document.getElementById('KeyError');
                invalidFeedback.style.display = 'block';
            } else {
                const invalidFeedback = document.getElementById('KeyError');
                invalidFeedback.style.display = 'none';
                this.addKey(this.keyForm);
            }
        },
        async getAllKeys() {
            try {
                this.loadingFromDB = true;
                const response = await axios.get(this.$store.state.connectionString + 'WaveAPIKey/getAll', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                this.items = response.data;

                this.loadingFromDB = false;
                //console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },        
        async addKey(key){
            console.log("a to zle")
            try {
                let request = {APIKey: key};
                let response = await axios.post(this.$store.state.connectionString + 'WaveAPIKey', request, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                if(response.status === 200){
                    this.getAllKeys();
                    this.clearFlag();
                    let successToast = new Toast(document.getElementById('successToast'));
                    successToast.show();  
                }
            } catch (error) {
                
            }
        },  
        clearFlag(){
            const invalidFeedback = document.getElementById('KeyError');
            invalidFeedback.style.display = 'none';
            this.keyForm = '';
        },
        async deleteItem(item) {
            try {
                let response = await axios.delete(this.$store.state.connectionString + 'WaveAPIKey/deleteById?guid=' + item.id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}); 
                if(response.status == 204){
                    Swal.fire({
                        title: 'Usunięto!',
                        text: 'Klucz został usunięty',
                        icon: 'success',
                        background: '#19191a',
                        color: 'white'
                    });
                    this.getAllKeys();
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Usuwanie się nie powiodło',
                    icon: 'error',
                    background: '#19191a',
                    color: 'white'
                });
            }
        },
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
    }
}
</script>

<style lang="scss" scoped>
.customize-table {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: #202832;

    --easy-table-header-item-padding: 10px 15px;
    
    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #283a4e;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: #22212196;
    --easy-table-body-row-hover-cursor: pointer;
    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #202832;
    --easy-table-footer-font-color: #ffffff;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}

.style-two {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 193, 7, 0.95), rgba(0, 0, 0, 0));
}
.iconStyleDetails{
    color: rgb(255, 166, 0);
    font-size: 1.25rem;
    cursor: pointer;
}
.iconStyleDelete{
    color: rgb(245, 32, 32);
    font-size: 1.25rem;
    cursor: pointer;
}
</style>