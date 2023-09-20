import FormatDate from '../helpers/FormatDate.js';
import PsiElement from '../models/PsiElement.js'
export default class PsiReportDetails {
    constructor(id, webName, result, amountOfErrors, amountOfPassed, dateTime, strategy, createdBy, psiVer, systemVer) {
      this.id = id;
      this.webName = webName;
      this.result = result;
      this.date = dateTime;
      this.strategy = strategy;
      this.createdById = createdBy;
      this.psiVersion = psiVer;
      this.systemVersion = systemVer;
      this.psiElement = [];
    }

    static fromResponse(response){
    //   console.log(response)
      let temp = new PsiReportDetails();      
      temp.psiElement = [];
      temp.id = response.id;
      temp.webName = response.webName;
      temp.result = response.result;
      temp.date = FormatDate(response.date);
      temp.strategy = response.strategy;
      temp.createdById = response.createdById;
      temp.psiVersion = response.psiVersion;
      temp.systemVersion = response.systemVersion;
      for(let i = 0; i < response.pageSpeedElement.length; i++){
        temp.psiElement.push(PsiElement.fromResponse(response.pageSpeedElement[i]));
      }
      console.log(temp)
      return temp;
    }
 }
