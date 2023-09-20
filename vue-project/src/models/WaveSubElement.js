//import WebLinks from '../models/WebLinks'
export default class WaveSubElement {
    constructor(id, selector) {
        this.id = id;
        this.selector = selector;

    }

    static fromResponse(response){
      let temp = new WaveSubElement();      
      
      temp.id = response.id;
      temp.snippet = response.snippet;
      temp.selector = response.selector;
      return temp;
    }
 }
