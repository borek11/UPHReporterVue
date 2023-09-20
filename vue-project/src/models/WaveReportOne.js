import FormatDate from '../helpers/FormatDate.js';
export default class WaveReportOne {
    constructor(id, webName, amountOfErrors, amountOfPassed, dateTime, strategy, systemVersion, waveVersion) {
      this.id = id;
      this.webName = webName;
      this.amountOfErrors = amountOfErrors;
      this.amountOfPassed = amountOfPassed;
      this.dateTime = dateTime;
      this.strategy = strategy;
      this.systemVersion = systemVersion;
      this.waveVersion = waveVersion;
    }

    static fromResponse(response){
      let temp = new WaveReportOne();      
      
      temp.id = response.id;
      temp.webName = response.webName;
      temp.amountOfErrors = response.amountOfErrors;
      temp.amountOfPassed = response.amountOfPassed;
      temp.strategy = response.strategy;
      temp.dateTime = FormatDate(response.dateTime);
      temp.systemVersion = response.systemVersion;
      temp.waveVersion = response.waveVersion;
      return temp;
    }
 }
