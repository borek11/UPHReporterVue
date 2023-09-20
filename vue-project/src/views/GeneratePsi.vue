<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Wykonaj raport PSI

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">

            <div class="form-floating col-6 m-auto ">
                <select class="form-select mb-3" id="selectDomain" aria-label="Floating label select example" v-model="selectedDomain">
                    <option v-for="domain in domains" :value="domain" :key="domain">{{ domain }}</option>
                </select>
                <label for="selectDomain">Wybierz witrynę</label>
            </div>

            <div class="col-12 col-md-8 m-auto rounded shadow-lg ">
                <ul class="nav nav-tabs" id="myTab" role="tablist" style="justify-content: center;">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link " id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" :class="{ 'active': activeTab === 'home' }" @click="activeTab = 'home'">Szczegóły witryny</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" :class="{ 'active': activeTab === 'profile' }" @click="activeTab = 'profile'">Strony witryny</button>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show " id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0" :class="{ 'show active': activeTab === 'home' }">
                        <div class="m-5" v-if="loadingFromDB">
                            <div class="spinner-border" role="status">
                                 <span class="visually-hidden">Ładowanie...</span>
                            </div>
                        </div>
                        <div class="shadow p-3 pb-4 rounded" v-else>
                            <h3 class="m-3">Witryna</h3>
                            <div class="row m-auto ms-5 me-5">
                                <div class="col-5 fw-bold text-start">
                                    Ilość stron:
                                </div>
                                <div class="col-7 text-start">
                                    {{ amountOfWebLinks }}
                                </div>
                            </div>
                            <!-- Desktop -->
                            <div class="row m-auto ms-5 me-5 mt-2">
                                <div class="col-5 fw-bold text-start">
                                    Desktop:
                                </div>
                            </div>                          

                            <div class="row m-auto ms-5 me-5">
                                <div class="col-5 text-start">
                                    <li>
                                        (Nie)Sprawdzone strony:
                                    </li>
                                </div>
                                <div class="col-7 text-start">
                                    ({{ amountOfWebLinks - amountDesktopReports }}) - {{ amountDesktopReports }}
                                </div>
                                <div class="col-5 text-start">
                                    <li>
                                        Raporty zaliczone (100%):
                                    </li>
                                </div>
                                <div class="col-7 text-start">
                                    {{ this.amountDesktopReports100 }}
                                </div>
                            </div>
                            <!-- Mobile -->
                            
                            <div class="row m-auto ms-5 me-5 mt-2">
                                <div class="col-5 fw-bold text-start">
                                    Mobilny:
                                </div>
                            </div>                          
                            
                            <div class="row m-auto ms-5 me-5">
                                <div class="col-5 text-start">
                                    <li>
                                        (Nie)Sprawdzone strony:
                                    </li>
                                </div>
                                <div class="col-7 text-start">
                                    ({{ amountOfWebLinks - amountMobileReports }}) - {{ amountMobileReports }}
                                </div>
                                <div class="col-5 text-start">
                                    <li>
                                        Raporty zaliczone (100%):
                                    </li>
                                </div>
                                <div class="col-7 text-start">
                                    {{ this.amountMobileReports100 }}
                                </div>
                            </div>
                            
                             
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0" :class="{ 'show active': activeTab === 'profile' }">
                        <div class="m-5" v-if="loadingFromDB">
                            <div class="spinner-border" role="status">
                                 <span class="visually-hidden">Ładowanie...</span>
                            </div>
                        </div>
                        <div class="shadow p-3 mb-5 rounded" v-else>
                            <h3 class="m-3">Strony</h3>
                            <div class="row m-3">
                                <div class="col-6">
                                <span class="ms-3 me-1">Wpisz Wartość: </span>

                                <input type="text" v-model="searchValue">
                                </div>
                                <div class="col-6 align-self-center">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="strategyRadioDesktop" value="Desktop" v-model="selectedRadio">
                                        <label class="form-check-label" for="strategyRadioDesktop">Desktopowy</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="strategyRadioMobile" value="Mobile" v-model="selectedRadio">
                                        <label class="form-check-label" for="strategyRadioMobile">Mobilny</label>
                                    </div>
                                </div>
                            </div>

                            <easy-data-table
                            
                            :headers="headersLink" 
                            :items="items" 
                            :rows-items=rowsItem 
                            :theme-color=themeColor
                            :buttons-pagination=true 
                            :search-value="searchValue" 
                            show-index 
                            header-text-direction="center" 
                            body-text-direction="center"
                            table-class-name="customize-table"               
                            >
                                <template #item-check="item" >
                                    <div :key="item.id">
                                        <input class="form-check-input" type="checkbox" v-model="itemsSelected" :value="item" />
                                    </div>
                                </template>

                                <template #item-result="item">
                                        <div v-if="item.result != null">
                                            {{item.result*100}}%
                                        </div>
                                        <div v-else> - </div>
                                </template>
                                <template #item-strategy="item">
                                        <div v-if="item.result != null">
                                            {{ item.strategy === 0 ? 'Desktopowy' : 'Mobilny' }}
                                        </div>
                                        <div v-else> - </div>
                                </template>
                                <template v-if="!isButtonExecDisabled" #item-operation="item">
                                        <div class="operation-wrapper" v-if="item.result != null">
                                            <i @click="detailsItemFromLinksTable(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wyświetl szczegóły" class="bi bi-info-square-fill iconStyleDetails iconStyle me-2"></i>
                                        </div>
                                        <div v-else> - </div>
                                </template>
                            </easy-data-table>

                        </div>
                    </div>
                </div>


            </div>
            <div class="col-12 col-md-8 m-auto bg-body-tertiary rounded mt-5">
                <h4 class="pt-3">Właściwości raportu</h4>
                    <form class="needs-validation " novalidate> 
                        <label for="divRadio" class="col-12 text-start ms-5 me-5 mt-3"> Wykonaj raporty po:</label>
                        <div class="mt-3 ms-5 me-5 col-3 " id="divRadio">
                            <div class="form-check mt-2" >
                                <input class="form-check-input" disabled type="radio" v-model="activeTab" value="home" id="radioForm3">
                                <label class="form-check-label col-11 text-start" for="radioForm3">
                                    Witrynie
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input " disabled type="radio" v-model="activeTab" value="profile" id="radioForm4">
                                <label class="form-check-label col-11 text-start" for="radioForm4">
                                    Stronach
                                </label>
                            </div>
                        </div>

                        <label for="divRadio" class="col-12 text-start ms-5 me-5 mt-3"> Typ raportu:</label>
                        <div class="mt-3 ms-5 me-5 col-3 " id="divRadio">
                            <div class="form-check mt-2" >
                                <input class="form-check-input" type="radio" v-model="payload.Strategy" :value="0" id="radioForm1">
                                <label class="form-check-label col-11 text-start" for="radioForm1">
                                    Desktopowy
                                </label>
                            </div>
                            <div class="form-check mt-2">
                                <input class="form-check-input " type="radio" v-model="payload.Strategy" :value="1" id="radioForm2">
                                <label class="form-check-label col-11 text-start" for="radioForm2">
                                    Mobilny
                                </label>
                            </div>
                        </div>
                        
                        <div v-if="activeTab!='profile'" class="form-check form-switch mt-3 ms-5 me-5 col-4 ">
                            <input class="form-check-input" v-model="payload.GenerateForExistsReport" type="checkbox" role="switch" id="formSwitchGenerate">
                            <label class="form-check-label col-11 text-start" for="formSwitchGenerate">Wykonać dla istniejących?</label>
                        </div>

                        <!-- <div class="form-check form-switch mt-3 ms-5 me-5 col-4 ">
                            <input class="form-check-input" v-model="payload.Save" type="checkbox" role="switch" id="formSwitchSave">
                            <label class="form-check-label col-11 text-start" for="formSwitchSave">Zapisać wyniki?</label>
                        </div>                     -->
                    </form>
                    <button class="btn btn-outline-primary m-auto mt-3 mb-3" :disabled="isButtonExecDisabled" @click="execReports()"> 
                        Wykonaj 
                    </button>
                 </div>
           
           <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="infoTast" class="toast text-bg-secondary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                    <div class="toast-header">
                        <strong class="me-auto">Wykonywanie...</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Wykonuję: {{currentLinks}}/{{totalLinks }}
                    </div>
                    <button class="btn btn-outline-warning btn-sm mb-1" @click="cancelReport()">Przerwij</button>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="infoTast2" class="toast text-bg-warning" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true">
                    <div class="toast-header">
                        <strong class="me-auto">Brak</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Brak stron do wykonania raportu 
                    </div>
                </div>
            </div>

            <div v-if="resultReports.length > 0" class="col-12 col-md-8 m-auto  rounded mt-5">
                <h4 class="pt-3 pb-3">Rezultat</h4>
                <easy-data-table 
                    :headers="headers" 
                    :items="psiReportDetails" 
                    :rows-items=rowsItem 
                    :theme-color=themeColor
                    :buttons-pagination=true 
                    show-index 
                    header-text-direction="center" 
                    body-text-direction="center"
                    table-class-name="customize-table"               
                >
                    <template #item-result="item">
                            <div>
                                {{item.result*100}}%
                            </div>
                    </template>
                    <template v-if="!isButtonExecDisabled" #item-operation="item">
                            <div class="operation-wrapper">
                                <i @click="detailsItem(item)"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wyświetl szczegóły" class="bi bi-info-square-fill iconStyle me-2 iconStyleDetails"></i>
                            </div>
                    </template>
                </easy-data-table>
                <button class="btn btn-outline-success m-auto mt-3 mb-3" v-show="isButtonSaveVisible" @click="saveReports()"> 
                    Zapisz 
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import AlertS from '../helpers/AlertS.js';
    import PsiReportOne from '../models/PsiReportOne';
    import PsiReportDetails from '../models/PsiReportDetails'
    import LinksAndReport from '../models/LinksAndReport'
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
                headers: [
                    { text: "Adres strony", value: "webName", sortable: true, width: 450 },
                    { text: "Rezultat", value: "result", sortable: true },
                    { text: "Ilość błędów", value: "amountOfErrors", sortable: true },
                    { text: "Zaliczone audyty", value: "amountOfAudits" },
                    { text: "Operacje", value: "operation" },
                ],
                headersLink: [
                    { text: "Wybierz", value: "check" },
                    { text: "Adres strony", value: "webName", sortable: true },
                    { text: "Typ raportu", value: "strategy", sortable: true },
                    { text: "Rezultat", value: "result", sortable: true},
                    { text: "Operacje", value: "operation" },
                ],
                
                items: [],
                itemsSelected: [],
                domains: [],
                selectedDomain: '',
                selectedRadio: 'Desktop',

                saveLinksForm: false,
                strategyForm: 0,
                executeExistsForm: false,
                isButtonExecDisabled: false,
                isButtonSaveDisabled: false,
                isButtonSaveVisible: false,

                amountOfWebLinks: 0,
                reports: [],
                amountMobileReports: 0,
                amountDesktopReports: 0,
                amountMobileReports100: 0,
                amountDesktopReports100: 0,
                
                payload: {
                    Urls: [],
                    Save: true,
                    GenerateForExistsReport: false,
                    Strategy: 0,
                    DomainName: ''
                },
                currentLinks: 0,
                totalLinks: 0,
                activeTab: 'home',
                webNames: [],
                resultReports: [],
                errorsReports: [],
                cancelFun: false,

                psiReportDetails: [],
                amountOfErrors: 0,
                amountOfAudits: 0,
                invalidUrls: [],
                isInvalidUrls: false,

                isEnd: false,
            }
        },
        components:{

        },
        computed: {
        },
        methods: {
            ...mapMutations(['SET_IS_USER']),

            async getDomains(){
                try{
                    let response = await axios.get(this.$store.state.connectionString + 'webpage/getDomains', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                    this.domains = response.data;
                    this.selectedDomain = this.domains[this.domains.length-1];
                    // await this.getMultiReport(this.selectedDomain);
                }catch(error){
                    console.log(error)
                }
            },
            async getWebAmount(domainName){
                try {
                    let response = await axios.get(this.$store.state.connectionString + 'webpage/getAmountDomain?domainName='+domainName , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    this.amountOfWebLinks = response.data;

                } catch (error) {
                    console.log(error);
                }
            },
            async getReports(domainName){
                try {
                    let response = await axios.get(this.$store.state.connectionString + 'PageSpeed/multiple?domain='+domainName , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    this.reports = response.data.map(item => PsiReportOne.fromResponse(item));
                    this.amountDesktopReports = this.reports.filter(item => item.strategy === 0).length;
                    this.amountMobileReports = this.reports.filter(item => item.strategy === 1).length;
                    this.amountDesktopReports100 = this.reports.filter(item => item.result === 1 && item.strategy === 0).length;
                    this.amountMobileReports100 = this.reports.filter(item => item.result === 1 && item.strategy === 1).length;
                } catch (error) {
                    console.log(error);
                }
            },
            async getLinksAboutDomain(domainName, generateForExists, strategy){
                try {
                    // let response = await axios.get(this.$store.state.connectionString + 'webpage/getLinksDomain?domainName='+domainName);                    
                    let response = await axios.get(this.$store.state.connectionString + 'PageSpeed/linksAndReports?domain='+domainName+'&strategy='+strategy, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    if(generateForExists == true){
                        this.webNames = response.data.map(item => item.webName);                    
                    }
                    else {
                        console.log("halo")
                        console.log(response.data)
                        this.webNames = response.data.filter(item => item.result === null).map(item => item.webName);                  
                    }
                    
                    //console.log(this.webNames);
                } catch (error) {
                    console.log(error);
                }
            },
            async getLinksAndReport(domainName){
                try {
                    //dopisac strategie
                    let strategy; 
                    this.selectedRadio == "Desktop" ? strategy = 0: strategy = 1;
                    let response = await axios.get(this.$store.state.connectionString + 'PageSpeed/linksAndReports?domain='+domainName+'&strategy='+strategy, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    this.items = response.data.map(item => LinksAndReport.fromResponse(item));               
                } catch (error) {
                    console.log(error);
                }
            },
            
            async execReports(webName){
                this.isButtonExecDisabled = true;
                this.isButtonSaveDisabled = this.payload.Save;
                this.isEnd = false;
                this.clear();

                let infoTast = new Toast(document.getElementById('infoTast'));
                infoTast.show();    

                if(this.activeTab == 'home'){
                    await this.execReportsAboutDomain(this.selectedDomain);
                }
                else {
                    await this.execReportsAboutLinks(webName);
                }
                infoTast.hide();
                this.isEnd = true;

                if(this.isInvalidUrls){
                    this.alertWarning();
                }
                this.isButtonExecDisabled = false;
                if(!this.isButtonSaveDisabled)
                    this.isButtonSaveVisible = true;
                
            },

            async execReportsAboutDomain(domainName){
                console.log(this.payload.Strategy);
                await this.getLinksAboutDomain(domainName, this.payload.GenerateForExistsReport, this.payload.Strategy);
                // if(this.payload.GenerateForExistsReport==true){
                //     this.totalLinks = this.webNames.length;

                // }
                // else{
                //     if(this.payload.Strategy == 0){
                //         this.totalLinks;
                //     }
                //     else{
                //         this.totalLinks = this.webNames.length - this.amountMobileReports;
                //     }
                // }
                this.totalLinks = this.webNames.length;
                if(this.totalLinks == 0 ){
                    let infoTast = new Toast(document.getElementById('infoTast2'));
                    infoTast.show();  
                }
                for (let i = 0; i < this.totalLinks; i++) {
                    if(this.cancelFun === true){
                        this.cancelFun = false;
                        break;
                    }
                    this.currentLinks = i+1;
                    await this.execOneReport(this.webNames[i]);
                } 
            },
            async execReportsAboutLinks(){
                this.totalLinks = this.itemsSelected.length;
                this.payload.GenerateForExistsReport = true;
                if(this.totalLinks == 0 ){
                    let infoTast = new Toast(document.getElementById('infoTast2'));
                    infoTast.show();  
                }
                for (let i = 0; i < this.totalLinks; i++) {
                    if(this.cancelFun === true){
                        this.cancelFun = false;
                        break;
                    }
                    this.currentLinks = i+1;
                    await this.execOneReport(this.itemsSelected[i].webName);
                } 
            },
            async execOneReport(webName){
                try {
                    this.payload.Urls = [webName];
                    this.payload.DomainName = this.selectedDomain;
                    let response = await axios.post(this.$store.state.connectionString + 'PageSpeed/report', this.payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    if(response.status === 200){
                        //console.log("Raport wykonany")
                        this.resultReports.push(response.data);
                        let tempReport = PsiReportDetails.fromResponse(response.data[0])
                        tempReport.amountOfErrors = tempReport.psiElement.filter(element => element.typeOfResult === 0).length;
                        tempReport.amountOfAudits = tempReport.psiElement.filter(element => element.typeOfResult === 2).length;
                        this.psiReportDetails.push(tempReport);
                    }
                    else{
                        //this.errorsReports.push(webName);
                    }
                    //console.log(response);
                } catch (error) {
                    console.log(error);
                    this.invalidUrls.push(webName);
                    this.isInvalidUrls = true;
                }
            },
            cancelReport(){
                this.cancelFun = true;
            },
            alertWarning(){
                let listItems = this.invalidUrls.map(item => `<li>${item}</li>`).join('');
      
                this.$swal.fire({
                    icon: 'warning',
                    color: 'white',
                    background:'#19191a',
                    title: 'Adresy stron zakończone niepowodzeniem:',
                    html: `<ul>${listItems}</ul>`,
                    confirmButtonText: 'Ok'
                });
            },
            clear(){
                this.currentLinks = null;
                this.totalLinks = null;
                this.resultReports = [];
                this.errorsReports = [];
                this.psiReportDetails = [];
                this.isInvalidUrls = false;
                this.invalidUrls = [];
                this.isButtonSaveVisible = false;
            },
            async saveReports(){
                try {
                    
                    let response = await axios.post(this.$store.state.connectionString + 'webpage/save', this.payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});         
                } catch (error) {
                    console.log(error);
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

                this.$router.push('/reportDetailsPsi/'+item.id);
            },
            detailsItemFromLinksTable(item){
                const innerElements = document.querySelectorAll('.tooltip-inner');
                innerElements.forEach((element) => {
                    element.remove();
                });

                const arrowElements = document.querySelectorAll('.tooltip-arrow');
                arrowElements.forEach((element) => {
                    element.remove();
                });
                
                this.$router.push('/reportDetailsPsi/'+item.reportId);
            },
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
                this.loadingFromDB = true;
                this.itemsSelected = [];
                this.getWebAmount(newVal);
                this.getReports(newVal);
                this.getLinksAndReport(newVal);
                this.loadingFromDB = false;
            },
            // activeTab(newVal, oldVal) {
            // },
            itemsSelected(newVal, oldVal){
                // console.log(this.itemsSelected[0].webName);
            },
            selectedRadio(newVal){
                this.itemsSelected = [];
                this.getLinksAndReport(this.selectedDomain);
            },
            isEnd(newVal){
                if(newVal == true){
                    this.loadingFromDB = true;
                    this.itemsSelected = [];
                    this.getWebAmount(this.selectedDomain);
                    this.getReports(this.selectedDomain);
                    this.getLinksAndReport(this.selectedDomain);
                    this.loadingFromDB = false;
                }
            },
            
        },
        mounted() {
            this.getDomains();
            document.title = 'Wykonaj raport PSI';
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