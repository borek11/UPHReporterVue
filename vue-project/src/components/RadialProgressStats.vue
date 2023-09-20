<template>
    <div>
      <h3 v-if="styleRadial=='normal'" class="m-3">{{ title }}</h3>
      <h4 v-else class="m-3">{{ title }}</h4>
      <div class="row" style="text-align: -webkit-center;">
        <div class="col-4 align-self-center">
          <RadialProgress
            :completedStepsProp="desktopCompletedSteps"
            :totalStepsProp="desktopTotalSteps"
            :diameterProp="diameterRadial"
            :strokeProp="strokeRadial"
          />
          <h5 v-if="styleRadial==='normal'" class="mt-2">Desktop</h5>
          <h6 v-else class="mt-2">Desktop</h6>
        </div>
        <div class="col-4">
          <RadialProgress
            :completedStepsProp="allCompletedSteps"
            :totalStepsProp="allTotalSteps"
            :diameterProp="diameterRadialCentral"
            :strokeProp="strokeRadialCenter"
          />        
          <h5 v-if="styleRadial==='normal'" class="mt-2">Razem</h5>
          <h6 v-else class="mt-2">Razem</h6>
        </div>
        <div class="col-4 align-self-center">
          <RadialProgress
            :completedStepsProp="mobileCompletedSteps"
            :totalStepsProp="mobileTotalSteps"
            :diameterProp="diameterRadial"
            :strokeProp="strokeRadial"
          />
          <h5 v-if="styleRadial==='normal'" class="mt-2">Mobilny</h5>
          <h6 v-else class="mt-2">Mobilny</h6>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RadialProgress from '../components/RadialProgress.vue';
  export default {
    components:{
        RadialProgress,
    },
    props: {
      title: {
        type: String,
        required: true
      },
      desktopCompletedSteps: {
        type: Number,
        required: true
      },
      allCompletedSteps: {
        type: Number,
        required: true
      },
      mobileCompletedSteps: {
        type: Number,
        required: true
      },
      desktopTotalSteps: {
        type: Number,
        required: true
      },
      allTotalSteps: {
        type: Number,
        required: true
      },
      mobileTotalSteps: {
        type: Number,
        required: true
      },
      diameterRadialCentral: {
        type: Number,
        required: true
      },
      diameterRadial: {
        type: Number,
        required: true
      },
      strokeRadial: {
        type: Number,
        required: true
      },
      strokeRadialCenter: {
        type: Number,
        required: true
      },
      styleRadial:{
        type: String,
        required: true
      },
    }
  }
  </script>