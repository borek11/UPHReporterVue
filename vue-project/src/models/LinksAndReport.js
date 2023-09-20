//import WebLinks from '../models/WebLinks'
export default class LinksAndReport {
    constructor(id, webName, domainName, reportId, result, dateTime, strategy) {
        this.id = id;
        this.webName = webName;
        this.domainName = domainName;
        this.reportId = reportId;
        this.result = result;
        this.dateTime = dateTime;
        this.strategy = strategy;
    }

    static fromResponse(response){
      let temp = new LinksAndReport();      
      
      temp.id = response.id;
      temp.webName = response.webName;
      temp.domainName = response.domainName;
      temp.reportId = response.reportId;
      temp.result = response.result;
      temp.dateTime = response.dateTime;
      temp.strategy = response.strategy;
      
      return temp;
    }
 }