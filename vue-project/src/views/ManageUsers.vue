<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Zarządzaj użytkownikami

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

            <template #item-person="item">
                <div>
                    {{ item.firstName }} {{ item.lastName }}
                </div>
            </template>

            <template #item-role="item">
                <div v-if="item.roleId == 1">
                    Administrator
                </div>
                <div v-else-if="item.roleId == 2">
                    Użytkownik
                </div>
                <div v-else> 
                    Zablokowany
                </div>
            </template>
                <template #item-operation="item">
                    <div v-if="item.roleId != 1" class="operation-wrapper">
                        <i v-if="item.roleId==3" @click="showUnBlockPrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Odblokuj" class="bi bi-person-check iconStyleDetails me-2"></i>
                        <i v-else-if="item.roleId==2" @click="showBlockPrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Zablokuj" class="bi bi-person-dash iconStyleDelete"></i>
                    </div>
                    <div v-else>
                        -
                    </div>
                </template>
            </easy-data-table>
        </div>
     
    </div>
</template>

<script>
import axios from 'axios'
import AlertS from '../helpers/AlertS.js';
import moment from 'moment';
import { Modal } from 'bootstrap'
import { Tooltip } from 'bootstrap'
import PromptBlock from '../helpers/PromptBlock.js';
import PromptUnBlock from '../helpers/PromptUnBlock.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            rowsItem: [10, 25, 50, 75, 100],
            themeColor: '#42b883',
            loadingFromDB: true,
            loadingModal: false,
            modalTitle: '',
            modalDomain: '',
            modalDate: '',
            headers: [
                { text: "Osoba", value: "person", sortable: true},
                { text: "Email", value: "email", sortable: true },
                { text: "Uprawnienia", value: "role", sortable: true },
                { text: "Operacje", value: "operation" },
            ],
            items: [],
            myModal: null,
        }
    },
    mounted() {
        this.getAllUsers();
        document.title = 'Zarządzanie użytkownikami';
        new Tooltip(document.body, {
            selector: "[data-bs-toggle='tooltip']",
        });
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

    methods: {
        async getAllUsers() {
            try {
                this.loadingFromDB = true;
                const response = await axios.get(this.$store.state.connectionString + 'user/getAll', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                this.items = response.data;

                this.items.forEach((item) => {
                    item.dateOfBirth = this.format_date(item.dateOfBirth)
                });
                this.loadingFromDB = false;
                //console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },
        async unblockUser(item){
            try {
                let response = await axios.post(this.$store.state.connectionString + 'user/unblock?id=' + item.id, null , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                if(response.status == 200){
                    this.getAllUsers();
                } 
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Odblokowanie się nie powiodło',
                    icon: 'error',
                    background: '#19191a',
                    color: 'white'
                });

            }
        },
        async blockUser(item){
            try {
                let response = await axios.post(this.$store.state.connectionString + 'user/block?id=' + item.id,null, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                if(response.status == 200){
                    this.getAllUsers();
                } 
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Zablokowanie się nie powiodło',
                    icon: 'error',
                    background: '#19191a',
                    color: 'white'
                });

            }
        },
        
        showBlockPrompt(item){
            PromptBlock(() => this.blockUser(item), "Użytkownik został zablokowany");
        },
        showUnBlockPrompt(item){
            PromptUnBlock(() => this.unblockUser(item), "Użytkownik został odblokowany");
        },
        format_date(value) {
            if (value) {
                var convert = moment(value).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
                return convert;
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
    color: rgb(0, 255, 55);
    font-size: 1.25rem;
    cursor: pointer;
}
.iconStyleDelete{
    color: rgb(245, 32, 32);
    font-size: 1.25rem;
    cursor: pointer;
}
</style>