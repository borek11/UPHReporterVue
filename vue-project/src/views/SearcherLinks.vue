<template>
    <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
            Przeszukaj strony

        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <div class="col-12 col-md-8 bg-body-tertiary  m-auto rounded shadow-lg ">
                
                <form class="needs-validation" novalidate> 

                    <div class="mb-3 pt-3 ms-5 me-5">
                        <div v-for="(input, index) in links" :key="index">
                            <div class="row input-size-sm mt-2">
                                <div class="col-11 form-floating ">
                                    <input type="text" :class="{'is-invalid': !isValidUrl(links[index]) }" v-model="links[index]" class="form-control" id="formLink" placeholder="Podaj link">
                                    <label class="ms-3" for="formLink">Link nr {{index + 1 }}</label>
                                    <div class="invalid-feedback">
                                      Wpisz poprawnie pełny adres strony
                                    </div>
                                </div>
                                <div class="col-1 mt-2" style="align-self: center;">
                                    <input type="button" :disabled="isDeleteDisabled" class="btn btn-outline-danger " @click="removeInput(index)" value="X"/>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">  
                            <div class="col-12">
                                <input type="button" :disabled="isAddDisabled" @click="addInput" class="btn btn-outline-success" value="Dodaj kolejną witrynę">
                            </div>
                        </div>
                    </div>
                    <div class="form-floating col-3 mt-3 ms-5 me-5">
                        <select class="form-select form-select form-select-sm" v-model="dto.depth" id="formDepth" aria-label="Floating label select example">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label for="formDepth">Głębokość szukania</label>
                    </div>
                    <div class="form-check form-switch mt-3 ms-5 me-5 col-3 ">
                        <input class="form-check-input" v-model="dto.saveLinks" type="checkbox" role="switch" id="formSwitch">
                        <label class="form-check-label" for="formSwitch">Zapisać wyniki?</label>
                    </div>
                    <div class="pb-4 mt-3 ms-5 me-5">
                        <input type="button" @click="submitForm" class="btn btn-outline-primary" value="Szukaj"/>

                    </div>
                </form>
            </div>
            
            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="errorToast" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">Niepowodzenie</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Uzupełnij poprawnie wszystkie adresy stron
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id="infoTast" class="toast text-bg-secondary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                    <div class="toast-header">
                        <strong class="me-auto">Szukanie...</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        Wykonuję: {{currentLinks}}/{{totalLinks }}
                    </div>
                </div>
            </div>

        </div>

        <div v-if="isResult">
            <div class="text-white text-center mt-2 mb-4 h3">
                Wyniki
            </div>
            <div class="container col-6 bg-dark p-2 mb-5 text-center">
                <div class="m-3">
                    <span class="me-1">Szukaj po:</span>
                    <select v-model="selectedOption" >
                        <option v-for="option in options" :value="option.value" :key="option.value">{{ option.label }}</option>
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
                        
                    :search-field="searchField"
                    :search-value="searchValue"                 
                >
                <template #item-operation="item" >
                    <div class="operation-wrapper" v-if="!isSavedButtonActive">
                        <i @click="showDeletePrompt(item)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Usuń stronę" class="bi bi-trash-fill iconStyleDelete"></i>
                    </div>
                    <div class="operation-wrapper" v-else>
                        -
                    </div>
                </template>
                </easy-data-table>
                <div class="mt-3" v-if="!isSavedButtonActive">
                    <button @click="showSavePrompt" class="btn btn-outline-success">Zapisz wyniki</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import PromptDelete from '../helpers/PromptDelete.js';
    import PromptSave from '../helpers/PromptSave.js';
    import AlertS from '../helpers/AlertS.js';
    import { Tooltip } from 'bootstrap'
    // import Swal from 'sweetalert2/dist/sweetalert2.js';
    import { Toast } from 'bootstrap'
    import { mapMutations } from 'vuex';

    export default {
        data() {
           return {
                links: ['https://ii.uph.edu.pl/'],
                dto: {
                    webName: 'https://ii.uph.edu.pl/',
                    depth: 1,
                    saveLinks: false
                },
                totalLinks: 0,
                currentLinks: 0,
                isResult: false,
                zmienna: [1,2,3],
                rowsItem: [10, 25, 50, 75, 100],
                themeColor: '#42b883',
                loadingFromDB: true,
                searchField: 'webName',
                searchValue: '',
                invalidUrls: [],
                isInvalidUrls: false,
                isMoreThanZero: false,
                isSavedButtonActive: false,
                headers: [
                    { text: "Adres strony", value: "webName", sortable: true},
                    { text: "Operacje", value: "operation" },
                ],
                items: [],
                responseLinks: [],
                selectedOption: '', // Wybrana opcja z selecta
                options: [] // Tablica opcji
            }
        },

        computed: {
            isDeleteDisabled() {
                return this.links.length === 1; // Sprawdzenie, czy jest tylko jeden input
            },

            isAddDisabled() {
                return this.links.some(input => input === '' || !this.isValidUrl(input)); // Sprawdzenie, czy któryś z inputów ma pustą wartość lub nieprawidłowy link
            }
        },
        watch: {
            selectedOption(newVal, oldVal) {
            // Wywołanie funkcji po zmianie wybranej opcji
            this.handleOptionChange();

            }
        },
        mounted(){
            document.title = 'Przeszukaj strony';
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
        methods:{
            addInput() {
                if (!this.isAddDisabled) {
                    this.links.push(''); // Dodanie pustego pola tekstowego
                }
            },
            removeInput(index) {
                this.links.splice(index, 1); // Usunięcie pola tekstowego o podanym indeksie
            },
            isValidUrl(url) {
                // Wyrażenie regularne do sprawdzenia poprawności linku
                if(url=='')
                    return true;
                
                //const urlRegex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
                return this.isCorrectPattern(url)
            },
            isCorrectPattern(url){
                //const urlRegex = /^(http:\/\/www\.|https:\/\/www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
                const urlRegex = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
                return urlRegex.test(url);
            },
            handleOptionChange() {
                this.items = [];

                this.responseLinks.forEach(element => {
                    if(element.index == this.selectedOption)
                        this.items.push({webName: element.webName});
                });
               // this.items = this.responseLinks.map(item => item.webName);
                console.log(this.items)
            },
            async submitForm(){
                this.isResult = false;
                const isValid = this.links.every(input => this.isCorrectPattern(input)); // Sprawdzenie, czy wszystkie linki są poprawne
                this.options = [];
                this.selectedOption = '';
                this.responseLinks = [];
                this.invalidUrls = [];
                this.isMoreThanZero = false;
                this.isInvalidUrls = false;
                this.isSavedButtonActive = this.dto.saveLinks;
                if (isValid) {
                    let infoTast = new Toast(document.getElementById('infoTast'));
                    
                    this.totalLinks = this.links.length;
                    infoTast.show();                    

                    for(let i = 0; i < this.links.length; i++){
                        this.dto.webName = this.links[i];
                        //const response = await axios.get(this.$store.state.connectionString + 'webpage'); 
                        try {
                            this.currentLinks = i+1;
                            const response = await axios.post(this.$store.state.connectionString + 'webpage', this.dto , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});
                            this.options.push({ value: i+1, label: this.links[i] });
                            this.selectedOption = i+1;
                            this.isMoreThanZero = true;
                            for(let j = 0; j < response.data.length; j++){
                                this.responseLinks.push({index: i+1, webName: response.data[j]});
                            }
                            //console.log(response.data.length);
                        } catch (error) {
                            console.log("error")
                            //console.error(error.response.data);
                            this.isInvalidUrls = true;
                            this.invalidUrls.push(this.links[i])
                        }
                    }
                    infoTast.hide();
                    if(this.isInvalidUrls){
                        this.alertWarning();
                    }
                    if(this.isMoreThanZero){
                        this.isResult = true;
                    }
                        
                } else {
                    let errorToast = new Toast(document.getElementById('errorToast'));
                    errorToast.show();
                }


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
            async saveLinks(){
                try{
                    //let urls = this.responseLinks.map(item => item.webName);
                    let urls = this.items.map(item => item.webName);
                    let payload = { Urls: urls };
                    let response = await axios.post(this.$store.state.connectionString + 'webpage/save', payload , {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}});

                    if(response.status == 204)
                        AlertS("success","Zapisano!");
                }catch (error) {
                    console.log(error)
                    AlertS("error","Błąd!");
                }
            },
            showSavePrompt(){
               PromptSave(() => this.saveLinks())
            },
            showDeletePrompt(item){
                PromptDelete(() => this.deleteItem(item), "Adres został usunięty");
            },
            deleteItem(item){
                if (item.index !== -1) {
                    this.items.splice(item.index - 1, 1);
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

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;
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
.iconStyleDelete{
    color: rgb(245, 32, 32);
    font-size: 1.25rem;
    cursor: pointer;
}
</style>