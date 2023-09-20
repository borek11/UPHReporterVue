import FormatDate from '../helpers/FormatDate.js';
import WaveElement from '../models/WaveElement.js'
export default class WaveReportDetails {
    constructor(id, webName, dateTime, strategy, createdBy, waveVer, systemVer) {
      this.id = id;
      this.webName = webName;
      this.date = dateTime;
      this.strategy = strategy;
      this.createdById = createdBy;
      this.waveVersion = waveVer;
      this.systemVersion = systemVer;
      this.waveElement = [];
    }

    static fromResponse(response){
    //   console.log(response)
      let temp = new WaveReportDetails();      
      temp.waveElement = [];
      temp.id = response.id;
      temp.webName = response.webName;
      temp.date = FormatDate(response.date);
      temp.strategy = response.strategy;
      temp.createdById = response.createdById;
      temp.waveVersion = response.waveVersion;
      temp.systemVersion = response.systemVersion;
      console.log("Hello")
      console.log(response)
      for(let i = 0; i < response.waveElements.length; i++){
        temp.waveElement.push(WaveElement.fromResponse(response.waveElements[i]));
      }
      console.log(temp)
      return temp;
    }
 }
