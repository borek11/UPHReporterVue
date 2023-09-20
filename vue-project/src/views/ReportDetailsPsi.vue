<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Raport: {{ psiReportDetails.webName }}

        </div>
        <div class="container  p-2 mb-5 mt-5 text-center shadow">
           <div class="m-auto bg-body-tertiary rounded" style="background-color: #203a6e;">
             <div class="row">
                <div class="col-8">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Nazwa strony: 
                        </div>
                        <div class="col-9 text-start">
                            {{ psiReportDetails.webName }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Wynik: 
                        </div>
                        <div class="col-9 text-start">
                            {{ psiReportDetails.result *100}}%
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Data wykonania: 
                        </div>
                        <div class="col-9 text-start">
                            {{ psiReportDetails.date }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Startegia: 
                        </div>
                        <div class="col-9 text-start">
                            <span v-if="psiReportDetails.strategy === 0"> Desktop</span>
                            <span v-if="psiReportDetails.strategy === 1"> Mobilna</span>
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Wykonawca: 
                        </div>
                        <div class="col-9 text-start">
                            {{ nameUser !== null && nameUser !== ''  ? nameUser : '-' }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Wersja PSI: 
                        </div>
                        <div class="col-9 text-start">
                            {{ psiReportDetails.psiVersion }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Wersja systemu: 
                        </div>
                        <div class="col-9 text-start">
                            {{ psiReportDetails.systemVersion }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Ilość błędów: 
                        </div>
                        <div class="col-9 text-start">
                            {{ amountOfErrors }}
                        </div>
                    </div>
                    <hr class="hrStyle">
                    <div class="row mb-3 mt-3 ms-5 fs-6 me-5">
                        <div class="col-3 fw-bold text-start">
                            Zaliczone audyty: 
                        </div>
                        <div class="col-9 text-start">
                            {{ amountOfAudits }}
                        </div>
                    </div>
                </div>
                <div class="col-4 mt-5 " style="text-align: -webkit-center;">
                    <RadialProgress
                        :completedStepsProp="psiReportDetails.result*100"
                        :totalStepsProp="100"
                        :diameterProp="200"
                        :strokeProp="8"
                    />
                    <Chart class="mt-4" :dataPoints="psiElements"></Chart>
                </div>
           </div>
           <div v-if="amountOfErrors !==0 " class="col-8 m-auto pt-3 pb-4">            
                <h4 >Błędy 
                    <i v-if="isCollapsedErrors" data-bs-toggle="collapse" href="#collapseErrorsTab" role="button" :aria-expanded="isCollapsedErrors" aria-controls="collapseErrorsTab" @click="toggleErrors" class="bi bi-arrow-up-circle-fill"></i> 
                    <i v-if="!isCollapsedErrors" data-bs-toggle="collapse" href="#collapseErrorsTab" role="button" :aria-expanded="isCollapsedErrors" aria-controls="collapseErrorsTab" @click="toggleErrors" class="bi bi-arrow-down-circle-fill"></i> 
                </h4> 
                <div class="collapse" id="collapseErrorsTab">
                    <easy-data-table 
                            :headers="headers" 
                            :items="itemsErrors" 
                            :rows-items=rowsItem 
                            :theme-color=themeColor
                            :buttons-pagination=true 
                            show-index 
                            header-text-direction="center" 
                            body-text-direction="center"
                            table-class-name="customize-tableErrors" 
                            :loading=loadingFromDB 
                            :search-field="searchField"
                            :search-value="searchValue"  
                    >
                    <template #expand="item">
                        <div style="padding: 15px">
                            <div class="row">
                                <div class="col-2 fw-bold text-end mb-2">
                                    Tytuł:
                                </div>
                                <div class="col-10 text-start">
                                    {{ item.title }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-2 fw-bold text-end">
                                    Opis:
                                </div>
                                <div class="col-10 text-start">
                                    {{ item.description }}
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-warning col-2 mt-5" type="button" @click="toggleCollapse(item.id)" >
                                {{ !item.isExpanded  ? 'Pokaż wystąpienia' : 'Zwiń' }}
                            </button>
                            <div class="pt-4"  v-bind:class="{'collapse': !item.isExpanded }" :id="'collapse-'+item.id">
                                <div class="row" v-for="itemElement in item.psiSubElement" :key="itemElement.id">
                                    <div class="col-2 fw-bold text-end mb-2">
                                        Snippet:
                                    </div>
                                    <div class="col-10 text-start">
                                        {{ itemElement.snippet }}
                                    </div>
                                    <div class="col-2 fw-bold text-end mb-2">
                                        Selektor:
                                    </div>
                                    <div class="col-10 text-start">
                                        {{ itemElement.selector }}
                                    </div>
                                    <hr>
                                </div>
                                <button class="btn btn-sm btn-outline-warning col-2 mt-2" type="button" @click="toggleCollapse(item.id)" >
                                {{ 'Zwiń' }}
                            </button>
                            </div>
                        </div>
                        
                    </template>
                    </easy-data-table>
                </div>
                <!-- <hr> -->
           </div>
           
           <div v-if="amountOfAudits !==0 " class="col-8 m-auto pt-3 pb-5">
                <h4 >Zaliczone audyty
                    <i v-if="isCollapsedErrors" data-bs-toggle="collapse" href="#collapseAuditsTab" role="button" :aria-expanded="isCollapsedErrors" aria-controls="collapseAuditsTab" @click="toggleAudits" class="bi bi-arrow-up-circle-fill"></i> 
                    <i v-if="!isCollapsedErrors" data-bs-toggle="collapse" href="#collapseAuditsTab" role="button" :aria-expanded="isCollapsedErrors" aria-controls="collapseAuditsTab" @click="toggleAudits" class="bi bi-arrow-down-circle-fill"></i> 
                </h4> 
                <div class="collapse" id="collapseAuditsTab">
                <easy-data-table 
                        :headers="headers" 
                        :items="itemsAudits" 
                        :rows-items=rowsItem 
                        :theme-color=themeColor
                        :buttons-pagination=true 
                        show-index 
                        header-text-direction="center" 
                        body-text-direction="center"
                        table-class-name="customize-tableAudits" 
                        :loading=loadingFromDB 
                        :search-field="searchField"
                        :search-value="searchValue"  
                >
                    <template #expand="item">
                        <div style="padding: 15px">
                            <div class="row">
                                <div class="col-2 fw-bold text-end mb-2">
                                    Tytuł:
                                </div>
                                <div class="col-10 text-start">
                                    {{ item.title }}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-2 fw-bold text-end">
                                    Opis:
                                </div>
                                <div class="col-10 text-start">
                                    {{ item.description }}
                                </div>
                            </div>
                        </div>
                    </template>
                </easy-data-table>
                </div>
           </div>
           <button :disabled="buttonDisabled" @click="showRepeatPrompt()" class="btn btn-outline-light m-auto col-2 mb-3">
            Wykonaj ponownie raport
        </button>
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
        
    </div>
</template>

<script>
    import axios from 'axios'
    import AlertS from '../helpers/AlertS.js';
    import RadialProgress from '../components/RadialProgress2.vue';
    import PromptRepeat from '../helpers/PromptRepeat.js';
    import Chart from '../components/Chart.vue';
    import { Toast } from 'bootstrap'
    import PsiReportDetails from '../models/PsiReportDetails'
    import { mapMutations } from 'vuex';
    export default {
        data() {
            return {
                psiReportDetails: new PsiReportDetails(),
                amountOfErrors: 0,
                amountOfAudits: 0,
                loadingFromDB: false,
                headers: [
                    { text: "Element", value: "elementName", sortable: true },                    
                    
                ],
                itemsErrors: [], 
                itemsAudits: [], 
                searchField: '',
                searchValue: '',
                rowsItem: [10, 25, 50, 75, 100],
                themeColor: '#42b883',

                nameUser: '',
                domainName: '',

                isCollapsed: true,
                isCollapsedErrors: false,
                isCollapsedAudits: false,

                buttonDisabled: false,
                totalLinks: 1,
                currentLinks: 1,
                psiElements: [
                    { name: "Błędy", y: 0, color: "#f72564" },
                    { name: "Ostrzeżenia", y: 0, color: "#f7aa25" },
                    { name: "Zaliczone", y: 0, color: "#25f75d" }
                ],
            }
        },
        components:{
            RadialProgress,
            Chart,
        },
        methods: {
            async getDetails(){
                try {
                    this.loadingFromDB = true;
                    let response = await axios.get(this.$store.state.connectionString + 'PageSpeed?guid=' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}); 
                    console.log(response)
                    if(response.status == 200){
                        this.psiReportDetails = PsiReportDetails.fromResponse(response.data);
                        // console.log(this.psiReportDetails)
                        this.amountOfErrors = this.psiReportDetails.psiElement.filter(element => element.typeOfResult === 0).length;
                        this.amountOfAudits = this.psiReportDetails.psiElement.filter(element => element.typeOfResult === 2).length;

                        this.psiElements[0].y = this.amountOfErrors;
                        this.psiElements[2].y = this.amountOfAudits;

                        this.psiReportDetails.psiElement.forEach(element => {
                            if(element.typeOfResult == 0)
                                this.itemsErrors.push(element);
                            else if(element.typeOfResult == 2)
                                this.itemsAudits.push(element);
                        });
                        this.itemsErrors = this.itemsErrors.map(item => ({...item, isExpanded: false  }));
                        document.title = 'Raport '+ this.psiReportDetails.webName;

                        if(this.psiReportDetails.createdById !== null && this.psiReportDetails.createdById !== '')
                            await this.getUser(this.psiReportDetails.createdById);
                        this.loadingFromDB = false;

                    }
                    else{
                        let errorToast = new Toast(document.getElementById('errorToast'));
                        errorToast.show();
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async getDomainName(){
                try {
                    let response = await axios.get(this.$store.state.connectionString + 'PageSpeed/getDomain?guid=' + this.$route.params.id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                     
                    this.domainName = response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async getUser(id){
                try {
                    let response = await axios.get(this.$store.state.connectionString + 'User/name?id=' + id, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}); 
                    this.nameUser = response.data.firstName + ' ' + response.data.lastName;
                } catch (error) {
                    console.log(error)
                }
            },
            toggleErrors(){
                this.isCollapsedErrors = !this.isCollapsedErrors;
            },
            toggleAudits(){
                this.isCollapsedAudits = !this.isCollapsedAudits;
            },

            toggleCollapse(itemId) {
                const item = this.itemsErrors.find(i => i.id === itemId);
                if (item) {
                    item.isExpanded = !item.isExpanded;
                }
            },
            showRepeatPrompt(){
                PromptRepeat(() => this.repeatReport());
            },
            async repeatReport(){
                this.buttonDisabled = true;
                let infoToast = new Toast(document.getElementById('infoToast'));
                infoToast.show();
                await this.execOneReport(this.psiReportDetails);
                infoToast.hide();
                this.buttonDisabled = false;
            },
            async execOneReport(item){
                try {
                    let payload = {
                        Urls: [item.webName],
                        Save: true,
                        GenerateForExistsReport: true,
                        Strategy: item.strategy, 
                        DomainName: this.domainName
                    }

                    let response = await axios.post(this.$store.state.connectionString + 'PageSpeed/report', payload, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});                    
                    if(response.status == 200){
                        // console.log(response.data[0].id)
                        this.$router.replace('/reportDetailsPsi/'+response.data[0].id).then(() => {
                            this.$nextTick(() => {
                                this.$options.mounted.call(this); // Wywołanie funkcji mounted ręcznie
                            });
                        });
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
        mounted() {
            this.getDetails();
            this.getDomainName();
            document.title = 'Raport';
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
.customize-tableErrors {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: #202832;

    --easy-table-header-item-padding: 10px 15px;
    
    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #ffffff;
    --easy-table-body-row-background-color: #7c3737a1;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: #eeeeee3d;
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
.customize-tableAudits {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #ffffff;
    --easy-table-header-background-color: #202832;

    --easy-table-header-item-padding: 10px 15px;
    
    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #ffffff;
    --easy-table-body-row-background-color: #377c5ca1;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    // --easy-table-body-row-hover-font-color: #2d3a4f;
    // --easy-table-body-row-hover-background-color: #eee;
    --easy-table-body-row-hover-font-color: #ffffff;
    --easy-table-body-row-hover-background-color: #eeeeee3d;
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
.hrStyle {
    border: 0;
    height: 2px;
    background-image: linear-gradient(to right, rgba(255, 249, 249, 0), rgba(252, 247, 247, 0.75), rgba(0, 0, 0, 0));
}
</style>