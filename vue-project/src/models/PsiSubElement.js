//import WebLinks from '../models/WebLinks'
export default class PsiSubElement {
    constructor(id, snippet, selector) {
        this.id = id;
        this.snippet = snippet;
        this.selector = selector;

    }

    static fromResponse(response){
      let temp = new PsiSubElement();      
      
      temp.id = response.id;
      temp.snippet = response.snippet;
      temp.selector = response.selector;
      return temp;
    }
 }
