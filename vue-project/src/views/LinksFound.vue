<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Lista stron

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <div class="m-3">
                <span class="me-1">Szukaj po:</span>
                <select v-model="searchField">
                    <option value="webName">Adres strony</option>
                    <option value="domainName">Domena</option>
                </select>
                <span class="ms-3 me-1">Wpisz Wartość: </span>

                <input type="text" v-model="searchValue">
            </div>
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
                :search-field="searchField"
                :search-value="searchValue"                 
            >

                <!-- <template #item-operation="{ teamName, teamUrl }">
                <a :href="teamUrl">{{ teamName }}</a>
            </template> -->
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <i @click="detailsItem(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wyświetl szczegóły" class="bi bi-info-square-fill iconStyleDetails me-2"></i>
                        <i @click="showDeletePrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Usuń stronę" class="bi bi-trash-fill iconStyleDelete"></i>
                        
                    </div>
                </template>
            </easy-data-table>
        </div>
        <!-- modal Start -->

        <div class="modal fade" id="myModal" ref="myModal" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <!-- <div v-if="loadingModal" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Ładowanie...</span>
            </div> -->
                    <div v-if="loadingModal" class="mt-3 mb-3 d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Ładowanie...</span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="modal-header ">
                            <h1 class="modal-title  fs-5" id="exampleModalLabel">Szczegóły</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row pb-5">
                                    <div class="col-12 text-center">
                                        <h3 class="text-center">Informacje dodatkowe</h3>
                                        <hr class="style-two">

                                        <div class="row">
                                            <div class="col-5 text-end">
                                                <h6> Nazwa strony:</h6>
                                            </div>
                                            <div class="col-2 text-center">
                                                :
                                            </div>
                                            <div class="col-5 text-start">
                                                <h6> {{ webLinks.webName }} </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5 text-end">
                                                <h6> Nazwa domeny:</h6>
                                            </div>
                                            <div class="col-2 text-center">
                                                :
                                            </div>
                                            <div class="col-5 text-start">
                                                <h6> {{ webLinks.domainName }} </h6>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5 text-end">
                                                <h6> Data:</h6>
                                            </div>
                                            <div class="col-2 text-center">
                                                :
                                            </div>
                                            <div class="col-5 text-start">
                                                <h6> {{ webLinks.date }} </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- PSI -->
                                <div class="row pb-5">
                                    <div class="col-12 text-center">
                                        <h3 class="text-center">Raport Page Speed Insights</h3>
                                        <hr class="style-two">
                                        <!-- PSI Desktop -->
                                        <div class="row">
                                                <div class="col-12 text-center">
                                                    <h5 class="text-center"><u>Wersja desktopowa</u></h5>
                                                </div>
                                        </div>
                                        <div v-if="isPsiDesktop">
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Rezultat</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportDesktop.result }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość błędów:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportDesktop.amountOfErrors }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość zaliczonych audytów.:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportDesktop.amountOfPassed }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Data:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportDesktop.dateTime }} </h6>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-2 text-center offset-5">
                                                    <button @click="detailsPsi(psiReportDesktop)" class="btn btn-sm btn-outline-warning bi bi-arrow-right-square"> Szczegóły</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="row">
                                                <div class="col-12 text-center">
                                                    <h6> Brak raportu</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- PSI mobile -->
                                        <div class="row mt-3">
                                                <div class="col-12 text-center">
                                                    <h5 class="text-center"><u>Wersja mobilna</u></h5>
                                                </div>
                                        </div>
                                        <div v-if="isPsiMobile">
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Rezultat</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportMobile.result }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość błędów:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportMobile.amountOfErrors }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość zaliczonych audytów.:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportMobile.amountOfPassed }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Data:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ psiReportMobile.dateTime }} </h6>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-2 text-center offset-5">
                                                    <button @click="detailsPsi(psiReportMobile)" class="btn btn-sm btn-outline-warning bi bi-arrow-right-square"> Szczegóły</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="row">
                                                <div class="col-12 text-center">
                                                    <h6> Brak raportu</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <!-- WAVE -->
                                <div class="row pb-5">
                                    <div class="col-12 text-center">
                                        <h3 class="text-center">Raport Wave</h3>
                                        <hr class="style-two">
                                        <!-- Wave Desktop -->
                                        <div class="row">
                                                <div class="col-12 text-center">
                                                    <h5 class="text-center"><u>Wersja desktopowa</u></h5>
                                                </div>
                                        </div>
                                        <div v-if="isWaveReportDesktop">
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość błędów:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ waveReportDesktop.amountOfErrors }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Ilość zaliczonych audytów.:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ waveReportDesktop.amountOfPassed }} </h6>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5 text-end">
                                                    <h6> Data:</h6>
                                                </div>
                                                <div class="col-2 text-center">
                                                    :
                                                </div>
                                                <div class="col-5 text-start">
                                                    <h6> {{ waveReportDesktop.dateTime }} </h6>
                                                </div>
                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-2 text-center offset-5">
                                                    <button @click="detailsWave(waveReportDesktop)" class="btn btn-sm btn-outline-warning bi bi-arrow-right-square"> Szczegóły</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="row">
                                                <div class="col-12 text-center">
                                                    <h6> Brak raportu</h6>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Zamknij</button>
                        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- modal End -->
    </div>
</template>

<script>
import axios from 'axios'
import AlertS from '../helpers/AlertS.js';
import moment from 'moment';
import { Modal } from 'bootstrap'
import { Tooltip } from 'bootstrap'
import WebLinks from '../models/WebLinks'
import PsiReportOne from '../models/PsiReportOne'
import WaveReportOne from '../models/WaveReportOne';
import PromptDelete from '../helpers/PromptDelete.js';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            rowsItem: [10, 25, 50, 75, 100],
            themeColor: '#42b883',
            loadingFromDB: true,
            searchField: 'webName',
            searchValue: '',
            loadingModal: false,
            modalTitle: '',
            modalDomain: '',
            modalDate: '',
            webLinks: new WebLinks(),
            psiReportDesktop: new PsiReportOne(),
            psiReportMobile: new PsiReportOne(),
            waveReportDesktop: new WaveReportOne(),
            waveReportMobile: new WaveReportOne(),
            isPsiReport: false,
            isPsiDesktop: false,
            isPsiMobile: false,
            isWaveReportDesktop: false,
            isWaveReportMobile: false,
            headers: [
                { text: "Adres strony", value: "webName", sortable: true, width: 600 },
                { text: "Domena", value: "domainName", sortable: true },
                { text: "Data", value: "date", sortable: true },
                { text: "Operacje", value: "operation" },
            ],
            items: [],
            myModal: null,
        }
    },
    mounted() {
        this.getAllLinks();
        document.title = 'Wyszukane strony';
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
    beforeUnmount(){

    },
    methods: {
        async getAllLinks() {
            try {
                this.loadingFromDB = true;
                const response = await axios.get(this.$store.state.connectionString + 'webpage/getAll', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                this.items = response.data;

                this.items.forEach((item) => {
                    item.date = this.format_date(item.date)
                });
                this.loadingFromDB = false;
                //console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        },
        async detailsItem(item) {

            this.myModal = new Modal(document.getElementById('myModal'));
            this.myModal.show();
            this.loadingModal = true;
            await this.getPSIReport(item.id);
            await this.getWaveReport(item.id);
            // info to modal
            this.webLinks.webName = item.webName;
            this.webLinks.domainName = item.domainName;
            this.webLinks.date = item.date;

            this.loadingModal = false;
        },
        async getPSIReport(webLinksId) {
            this.clearFlags();
            const response = await axios.get(this.$store.state.connectionString + 'PageSpeed/getOne?webLinksId=' + webLinksId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});            
            if (response.status == 200) {
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].strategy == 0) {
                            this.isPsiDesktop = true;
                            this.psiReportDesktop = PsiReportOne.fromResponse(response.data[i])
                        }
                        else if (response.data[i].strategy == 1) {
                            this.isPsiMobile = true;
                            this.psiReportMobile = PsiReportOne.fromResponse(response.data[i]);
                        }
                    }
                }
            }
        },
        async getWaveReport(webLinksId) {
            const response = await axios.get(this.$store.state.connectionString + 'Wave/getOne?webLinksId=' + webLinksId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});            
            if (response.status == 200) {
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].strategy == 0) {
                            this.isWaveReportDesktop = true;
                            this.waveReportDesktop = WaveReportOne.fromResponse(response.data[i])
                        }
                        else if (response.data[i].strategy == 1) {
                            this.isWaveReportMobile = true;
                            this.waveReportMobile = WaveReportOne.fromResponse(response.data[i])
                        }
                    }
                }
            }
        },
        async deleteItem(item) {
            try {
                let response = await axios.delete(this.$store.state.connectionString + 'webpage/' + item.id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                if(response.status == 204){
                    this.getAllLinks();
                } 
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Usuwanie się nie powiodło',
                    icon: 'error',
                    background: '#19191a',
                    color: 'white'
                });

            }
            console.log(item);
        },
        showDeletePrompt(item){
            PromptDelete(() => this.deleteItem(item), "Strona wraz z raportami została usunięta");
        },
        format_date(value) {
            if (value) {
                var convert = moment(value).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
                return convert;
            }
        },
        clearFlags(){
            this.isPsiDesktop = false;
            this.isPsiMobile = false;
            this.isPsiReport = false;
            this.isWaveReportDesktop = false;
            this.isWaveReportMobile = false;
        },
        detailsPsi(item){
            this.myModal.hide();
            this.$router.push('/reportDetailsPsi/'+item.id);
        },
        detailsWave(item){
            this.myModal.hide();
            this.$router.push('/reportDetailsWave/'+item.id);
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