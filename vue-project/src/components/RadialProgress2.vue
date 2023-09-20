  <template>
    <div>
      <radial-progress-bar
        :diameter="diameterProp"
        :completed-steps="completedStepsProp"
        :total-steps="totalStepsProp"
        :innerStrokeWidth = "strokeProp"
        :strokeWidth = "strokeProp"
        :startColor = "colorRadial"
        :stopColor = "colorRadial"
        innerStrokeColor = '#222222'
      >
      <p class="fs-2">{{ completedStepsProp }}%</p>
      </radial-progress-bar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RadialProgress',
    data() {
      return {
        colorRadial: '#FF0000',
      };
    },
    mounted(){
      if(this.totalStepsProp !== 0)
        this.changeColor();

    },
    props: {
      completedStepsProp: Number,
      totalStepsProp: Number,
      diameterProp: Number,
      strokeProp: Number,
    },
    watch:{
      totalStepsProp(newVal, oldVal){
        this.changeColor(newVal);
        console.log();
      },
      completedStepsProp(newVal, oldVal){
        this.changeColor(newVal);
        console.log();
      },
      
    },
    methods: {
      logVariables() {
        console.log(this.completedStepsProp);
        console.log(this.totalStepsProp);
      },
      changeColor(newVal){
        let result = this.completedStepsProp / this.totalStepsProp * 100;
        //console.log("Rezultat: " + result)

        if(result<=10)
          this.colorRadial = '#FF0000';
        else if(result<=20)
          this.colorRadial = '#FF3300';
        else if(result<=30)
          this.colorRadial = '#FF6600';
        else if(result<=40)
          this.colorRadial = '#FF9900';  
        else if(result<=50)
          this.colorRadial = '#FFCC00';
        else if(result<=60)
          this.colorRadial = '#FFFF00';
        else if(result<=70)
          this.colorRadial = '#CCFF00';  
        else if(result<=80)
          this.colorRadial = '#99FF00';
        else if(result<=90)
          this.colorRadial = '#66FF00';
        else if(result<100)
          this.colorRadial = '#33FF00';  
        else   
          this.colorRadial = '#00FF00';  
      },
    },
  };
  </script>