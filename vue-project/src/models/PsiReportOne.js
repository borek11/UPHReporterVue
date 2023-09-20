import FormatDate from '../helpers/FormatDate.js';
export default class PsiReportOne {
    constructor(id, webName, result, amountOfErrors, amountOfPassed, dateTime, strategy) {
      this.id = id;
      this.webName = webName;
      this.result = result;
      this.amountOfErrors = amountOfErrors;
      this.amountOfPassed = amountOfPassed;
      this.dateTime = dateTime;
      this.strategy = strategy;
    }

    static fromResponse(response){
      let temp = new PsiReportOne();      
      
      temp.id = response.id;
      temp.webName = response.webName;
      temp.result = response.result;
      temp.amountOfErrors = response.amountOfErrors;
      temp.amountOfPassed = response.amountOfPassed;
      temp.strategy = response.strategy;
      temp.dateTime = FormatDate(response.dateTime);
      return temp;
    }
 }
