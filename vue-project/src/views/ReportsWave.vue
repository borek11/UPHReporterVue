<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Raporty Wave

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <div class="form-floating col-6 m-auto">
                <select class="form-select mb-3" id="selectDomain" aria-label="Floating label select example" v-model="selectedDomain">
                    <option v-for="domain in domains" :value="domain" :key="domain">{{ domain }}</option>
                </select>
                <label for="selectDomain">Wybierz witrynę</label>
            </div>
            
            <ul class="nav nav-tabs" id="myTab" role="tablist" style="justify-content: center;">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Podsumowanie</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tabela</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <div class="m-5" v-if="loadingFromDB">
                        <div class="spinner-border" role="status">
                             <span class="visually-hidden">Ładowanie...</span>
                        </div>
                    </div>
                    <div class="shadow p-3 mb-5 rounded" v-else>
                        <h3 class="m-3">Szczegóły</h3>
    
                        <div class="row m-auto mt-4">
                            <!-- Desktop -->
                            <div class="col-12">
                                <h5 class="text-decoration-underline link-offset-1">Desktop</h5>
                                <div class="row">
                                    <div class="col-5 text-end fw-bold">Strony sprawdzone</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5 text-start">{{amountOfReports }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-5 text-end fw-bold">Strony niesprawdzone</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5 text-start">{{amountOfWebLinks - amountOfReports }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-5 text-end fw-bold">Znaleziony błędy</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5 text-start">{{sumError }}</div>
                                </div>
                                <div class="row ">
                                    <div class="col-5 text-end fw-bold">Poprawne audyty</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5 text-start">{{sumPassed}}</div>
                                </div>

                            </div>
                        </div>
                        
                        <hr class="style-hr m-3">
                        <h3>Ilość raportów dla znalezionych stron</h3>
                        <div class="row" style="text-align: -webkit-center;">
                            <div class="col-4 align-self-center m-auto">
                                <RadialProgress
                                    :completedStepsProp="amountOfReports"
                                    :totalStepsProp="amountOfWebLinks"
                                    :diameterProp="diameterRadialCentral"
                                    :strokeProp="strokeRadial"
                                />
                            </div>
                        </div>

                        <hr class="style-hr m-3">
                        <h3>Ilość poprawnych raportów (0 błędów)</h3>
                        <div class="row" style="text-align: -webkit-center;">
                            <div class="col-4 align-self-center m-auto">
                                <RadialProgress
                                    :completedStepsProp="amount0"
                                    :totalStepsProp="amountOfReports"
                                    :diameterProp="diameterRadialCentral"
                                    :strokeProp="strokeRadial"
                                />
                            </div>
                        </div>
                        
                        <div class="row" style="text-align: -webkit-center;">
                            <button class="btn btn-outline-primary col-2 offset-5 mt-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResults" :aria-expanded="isCollapsed ? 'false' : 'true'"  @click="toggleCollapse" aria-controls="collapseResults">
                                {{ isCollapsed ? 'Pokaż więcej' : 'Zwiń' }}
                            </button>
                            <div class="collapse pt-4" id="collapseResults">
                                <div class="col-10  shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                                    <h4>Ilość raportów z błedami 1-10</h4>
                                    <div class="row" style="text-align: -webkit-center;">
                                        <div class="col-4 align-self-center m-auto">
                                            <RadialProgress
                                                :completedStepsProp="amount1_10"
                                                :totalStepsProp="amountOfReports"
                                                :diameterProp="diameterRadialCentral"
                                                :strokeProp="strokeRadial"
                                            />
                                        </div>
                                    </div>

                                    <hr class="style-hr m-3">
                                    <h4>Ilość raportów z błedami 11-20</h4>
                                    <div class="row" style="text-align: -webkit-center;">
                                        <div class="col-4 align-self-center m-auto">
                                            <RadialProgress
                                                :completedStepsProp="amount11_20"
                                                :totalStepsProp="amountOfReports"
                                                :diameterProp="diameterRadialCentral"
                                                :strokeProp="strokeRadial"
                                            />
                                        </div>
                                    </div>

                                    <hr class="style-hr m-3">
                                    <h4>Ilość raportów z błedami powyżej 20</h4>
                                    <div class="row" style="text-align: -webkit-center;">
                                        <div class="col-4 align-self-center m-auto">
                                            <RadialProgress
                                                :completedStepsProp="amount21"
                                                :totalStepsProp="amountOfReports"
                                                :diameterProp="diameterRadialCentral"
                                                :strokeProp="strokeRadial"
                                            />
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-outline-primary col-2 mt-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResults" :aria-expanded="isCollapsed ? 'false' : 'true'"  @click="toggleCollapse" aria-controls="collapseResults">
                                        Zwiń
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr class="style-hr m-3">
                        
                    </div>
                </div>
                <div class="tab-pane fade shadow p-3 mb-5 rounded" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                     
                    <div class="row m-3">
                        <!-- <span class="me-1">Szukaj po:</span>
                        <select v-model="searchField">
                            <option value="domainName">Domena</option>
                        </select> -->
                        <div class="col-12">
                        <span class="ms-3 me-1">Wpisz Wartość: </span>

                        <input type="text" v-model="searchValue">
                        </div>
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
                        :body-row-class-name="bodyRowClassNameFunction"             
                    >

                    <template #item-strategy="item">
                        <div v-if="item.strategy==1">
                            Mobilny
                        </div>
                        <div v-else>
                            Desktopowy
                        </div>
                    </template>

                    <template #item-operation="item">
                            <div class="operation-wrapper">
                                <i @click="showRepeatPrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wykonaj ponownie raport" class="bi bi-arrow-repeat iconStyleRepeat me-2"></i>
                                <i @click="detailsItem(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wyświetl szczegóły" class="bi bi-info-square-fill iconStyleDetails me-2"></i>
                                <i @click="showDeletePrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Usuń raport" class="bi bi-trash-fill iconStyleDelete"></i>
                            </div>
                    </template>
                    </easy-data-table>
                </div>
            </div>
            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="errorToast" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">Niepowodzenie</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Coś poszło nie tak
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="deleteToast" class="toast text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">Usunięto</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Poprawnie usunięto raport z bazy
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="infoToast" class="toast text-bg-secondary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                    <div class="toast-header">
                        <strong class="me-auto">Wykonywanie...</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Wykonuję: {{currentLinks}}/{{totalLinks }}
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import PromptDelete from '../helpers/PromptDelete.js';
    import PromptRepeat from '../helpers/PromptRepeat.js';
    import RadialProgress from '../components/RadialProgress.vue';
    import RadialProgressStats from '../components/RadialProgressStats.vue';
    import AlertS from '../helpers/AlertS.js';
    import WaveReportOne from '../models/WaveReportOne'
    import { Toast } from 'bootstrap'
    import { Tooltip } from 'bootstrap'
    import { mapMutations } from 'vuex';

    export default {
        data() {
            return {
                rowsItem: [10, 25, 50, 75, 100],
                themeColor: '#42b883',
                loadingFromDB: false,
                searchField: 'webName',
                searchValue: '',
                domains: [],
                selectedDomain: '',
                selectedRadio: 'Both',

                amountOfReports: 0,
                avgResult: 0,
                amountOfWebLinks: 0,

                sumError: 0,
                sumPassed: 0,
                amount0: 0,
                amount1_10: 0,
                amount11_20: 0,
                amount21: 0,
                

                diameterRadialDetails: 75,
                diameterRadialCentralDetails: 115,
                diameterRadial: 100,
                diameterRadialCentral: 130,
                strokeRadial: 6,
                strokeRadialDetails: 5,
                completedSteps: 5,
                totalSteps: 20,

                totalLinks: 1,
                currentLinks: 1,

                loadingSummary: false,
                loadingModal: false,
                modalTitle: '',
                modalDomain: '',
                modalDate: '',
                isPsiReport: false,
                isPsiDesktop: false,
                isPsiMobile: false,
                isCollapsed: true,

                headers: [
                    { text: "Adres strony", value: "webName", sortable: true, width: 600 },                    
                    { text: "Data", value: "dateTime", sortable: true },
                    { text: "Typ raportu", value: "strategy", sortable: true },
                    { text: "Błędy", value: "amountOfErrors", sortable: true },
                    { text: "Operacje", value: "operation" },
                ],
                items: [],
                itemsNoFilters: [],
            }
        },
        components:{
            RadialProgress,
            RadialProgressStats,
        },
        methods: {
            async getDomains(){
                try{
                    let response = await axios.get(this.$store.state.connectionString + 'webpage/getDomains', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                    this.domains = response.data;
                    this.selectedDomain = this.domains[this.domains.length-1];
                    await this.getMultiReport(this.selectedDomain);
                }catch(error){
                    console.log(error)
                }
            },
            async getMultiReport(domain){
                try {
                    this.loadingFromDB = true;
                    let response = await axios.get(this.$store.state.connectionString + 'Wave/multiple?domain=' + domain, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                    this.itemsNoFilters = response.data.map(item => WaveReportOne.fromResponse(item));
                    //this.items = response.data.map(item => PsiReportOne.fromResponse(item));
                    this.handleRadioChange("Desktop");
                    this.getAmountWebLinks(domain);
                    this.computeReports();
                    this.loadingFromDB = false;
                } catch (error) {
                    
                }
            },
            async handleOptionChange(domain) {
                this.items = [];
                await this.getMultiReport(domain);
            },
            handleRadioChange(strategy){
                if(strategy == "Desktop")
                    this.items = this.itemsNoFilters.filter(item => item.strategy === 0);
                else if(strategy == "Mobile")
                    this.items = this.itemsNoFilters.filter(item => item.strategy === 1);
                else
                this.items = this.itemsNoFilters;
            },

            getAmountWebLinks(domain){
                axios.get(this.$store.state.connectionString + 'webpage/getAmountDomain?domainName=' + domain, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(res => {
                    this.amountOfWebLinks = res.data;
                },err => {
                     console.log(err);
                });
            },
            computeReports(){
                
                this.amountOfReports = this.itemsNoFilters.filter(item => item.strategy === 0).length;          
                
                this.sumError = this.itemsNoFilters.reduce((accumulator, item) => {
                    if (item.strategy === 0) {
                        return accumulator + item.amountOfErrors;
                    }
                    return accumulator;
                }, 0);
                this.sumPassed = this.itemsNoFilters.reduce((accumulator, item) => {
                    if (item.strategy === 0) {
                        return accumulator + item.amountOfPassed;
                    }
                    return accumulator;
                }, 0);
                
                this.amount0 =  this.itemsNoFilters.filter(item => item.strategy === 0 && (item.amountOfErrors == 0 )).length;
                this.amount1_10 =  this.itemsNoFilters.filter(item => item.strategy === 0 && (item.amountOfErrors >= 0 && item.amountOfErrors <= 10 )).length;
                this.amount11_20 =  this.itemsNoFilters.filter(item => item.strategy === 0 && (item.amountOfErrors >= 11 && item.amountOfErrors <= 20 )).length;
                this.amount21 =  this.itemsNoFilters.filter(item => item.strategy === 0 && (item.amountOfErrors >= 21  )).length;
                
            },

            bodyRowClassNameFunction(item, index) {
                // funkcja do zwracania nazwy klasy dla wiersza
                if (item.amountOfErrors > 20) {
                    return 'fail-row' 
                } 
                else if (item.amountOfErrors > 10){
                    return 'warning-row' 
                }
                else if (item.amountOfErrors > 0){
                    return 'almostPass-row' 
                }
                else {
                    return 'pass-row'; 
                }
            },
            toggleCollapse() {
               this.isCollapsed = !this.isCollapsed;
            },
            async deleteItem(item){

                try {
                    let response = await axios.delete(this.$store.state.connectionString + 'Wave?guid=' + item.id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}); 
                    if(response.status == 204){
                        this.handleOptionChange(this.selectedDomain);
                    }
                    else{
                        let errorToast = new Toast(document.getElementById('errorToast'));
                        errorToast.show();
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            },
            detailsItem(item){
                const innerElements = document.querySelectorAll('.tooltip-inner');
                innerElements.forEach((element) => {
                    element.remove();
                });

                const arrowElements = document.querySelectorAll('.tooltip-arrow');
                arrowElements.forEach((element) => {
                    element.remove();
                });
                this.$router.push('/reportDetailsWave/'+item.id);
            },

            showDeletePrompt(item){
                PromptDelete(() => this.deleteItem(item), "Raport został usunięty");
            },
            showRepeatPrompt(item){
                PromptRepeat(() => this.repeatReport(item));
            },
            async repeatReport(item){
                let infoToast = new Toast(document.getElementById('infoToast'));
                infoToast.show();
                await this.execOneReport(item);
                infoToast.hide();
            },
            async execOneReport(item){
                try {
                    let payload = {
                        Urls: [item.webName],
                        Save: true,
                        GenerateForExistsReport: true,
                        Strategy: item.strategy,
                        VersionWave: item.systemVersion,
                        VersionSystem: item.waveVersion,
                        DomainName: this.selectedDomain
                    }
                    let response = await axios.post(this.$store.state.connectionString + 'Wave/report', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    if(response.status == 200){
                        this.handleOptionChange(this.selectedDomain);
                    }
                    else{
                        let errorToast = new Toast(document.getElementById('errorToast'));
                        errorToast.show();
                    }
                } catch (error) {
                    console.log(error);
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

        },
        watch: {
            selectedDomain(newVal, oldVal) {
                this.handleOptionChange(newVal);
            },
            selectedRadio(newVal, oldVal) {
                this.handleRadioChange(newVal);
            },
        },
        
        mounted() {
            this.getDomains();
            document.title = 'Raporty PSI';
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

    // --easy-table-body-row-hover-font-color: #2d3a4f;
    // --easy-table-body-row-hover-background-color: #eee;
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
.style-hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.815), rgba(255, 255, 255, 0));
}

</style>
<style>
.fail-row {
    --easy-table-body-row-background-color: #fc7f7f7e;
  --easy-table-body-row-font-color: #fff;
}
.pass-row {
  --easy-table-body-row-background-color: #00FF007e;
  --easy-table-body-row-font-color: #fff;
}
.warning-row {
  --easy-table-body-row-background-color: #ffae007e;
  --easy-table-body-row-font-color: #fff;
}
.almostPass-row {
  --easy-table-body-row-background-color: #79f8797e;
  --easy-table-body-row-font-color: #fff;
}
.iconStyleRepeat{
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    cursor: pointer;
}
.iconStyleRepeat:hover{
    color: rgb(24, 207, 24);
    font-size: 1.25rem;
    cursor: pointer;
}

.iconStyleDetails{
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    cursor: pointer;
}
.iconStyleDetails:hover{
    color: rgb(255, 166, 0);
    font-size: 1.25rem;
    cursor: pointer;
}

.iconStyleDelete{
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    cursor: pointer;
}
.iconStyleDelete:hover{
    color: rgb(245, 32, 32);
    font-size: 1.25rem;
    cursor: pointer;
}
</style>