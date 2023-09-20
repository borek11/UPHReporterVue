<template>
     <div class="container-fluid">
        <div class="text-white text-center mt-2 mb-4 h2">
          Accessibility Spider
        </div>
        <div class="container bg-dark p-2 mb-5 text-center">
            <div class="col-10 col-md-8 bg-body-tertiary p-5 m-auto rounded shadow-lg ">
            <p class="fs-3 fw-lighter" >System wspierający automatyzację procesu oceny dostępności cyfrowej dla zbiorów witryn internetowych z wykorzystaniem pająka internetowego i usług weryfikujących standardy WCAG.
            </p>
            </div>
        </div>
      <hr>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'LoadReport',
        data(){
            return {
                posts: [],
            }
        },
        mounted(){
            document.title = 'Accessibility Spider';
        },
        methods: {
            async getReports() {
                try {
                    console.log(this.$store.state.connectionString)
                    const response = await axios.get(this.$store.state.connectionString+'PageSpeed/multiple?domain=ii.uph.edu.pl');
                    this.posts = response.data;
                    console.log(response.data)
                    console.log(this.posts.length)
                } catch (error) {
                    console.error(error);
                }
            },
        }

    }
</script>


<style scoped>

</style>