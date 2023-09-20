<!-- <template>
    <div>
      test
    </div>
  </template>
  
  <script>
  </script> -->


  <template>
    <div>
      <p>isUser: {{ isUser }}</p>
      <button @click="setIsUser(true)">Ustaw na true</button>
      <button @click="setIsUser(false)">Ustaw na false</button>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['isUser']),
    },
    methods: {
      ...mapMutations(['SET_IS_USER']),
      setIsUser(value) {
        this.SET_IS_USER(value);
      },
    },
  };
  </script>