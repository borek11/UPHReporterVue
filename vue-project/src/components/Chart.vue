<script>

export default {
  props: {
    dataPoints: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
        chartContainerKey: 0,
      chart: null,
      options: {
        animationEnabled: true,
        backgroundColor: "#2b3035",
        
        title: {
          text: "Analiza",
          fontColor: "#adb5bd",
          verticalAlign: "center", // "top", "center", "bottom"
          horizontalAlign: "center", // "left", "right", "center"
          fontFamily: "tahoma",
          fontSize: 25,
          
        },
        legend: {
            fontColor: "#adb5bd", 
            fontSize: 16,            
        },
        data: [{
            
          type: "doughnut",
          innerRadius: "90%",
          showInLegend: false,
          legendText: "{name}: {y}",
          yValueFormatString: "#,###''",
          dataPoints: this.dataPoints,
        }]
      },
      styleOptions: {
          width: "100%",
          height: "220px"
        }
    }
  },
  watch: {
    dataPoints: {
      handler(newDataPoints) {
        // Aktualizacja danych wykresu przy zmianie dataPoints
        this.options.data[0].dataPoints = newDataPoints;
        // Odświeżenie wykresu, jeśli jest zainicjalizowany
        this.chartContainerKey += 1
        
      },
      deep: true
    }
  },

}
</script>

<template>
    <div>
        <div :key="chartContainerKey" id="chartContainer">
            <CanvasJSChart :options="options" :styles="styleOptions"/>
        </div>
        <div class="custom-legend">
            <div v-for="dataPoint in dataPoints" :key="dataPoint.name">
                <div v-if="dataPoint.y !== 0" >
                    <span class="legend-dot" :style="{ backgroundColor: dataPoint.color }"></span>
                    <span >{{ dataPoint.name }}: </span>
                    <span >{{ dataPoint.y }}</span>
                </div>
            </div>
        </div>
  </div>
  
</template>
<style>
.custom-legend {
  margin-top: 20px; /* Ustaw margines górny */
  display: flex;
  justify-content: center;
}

.custom-legend div {
  margin-right: 1%; /* Ustaw margines prawy między elementami legendy */
}
.custom-legend .legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
.chart-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: bold;
  color: #adb5bd;
}
</style>