//import WebLinks from '../models/WebLinks'
import PsiSubElement from '../models/PsiSubElement.js'
export default class PsiElement {
    constructor(id, elementName, title, description, typeOfResult) {
        this.id = id;
        this.elementName = elementName;
        this.title = title;
        this.description = description;
        this.typeOfResult = typeOfResult;
        this.psiSubElement = [];
    }

    static fromResponse(response){
      let temp = new PsiElement();      
      
      temp.id = response.id;
      temp.elementName = response.elementName;
      temp.title = response.title;
      temp.description = response.description;
      temp.typeOfResult = response.typeOfResult;
      for(let i = 0; i < response.pageSpeedSubElement.length; i++){
        temp.psiSubElement.push(PsiSubElement.fromResponse(response.pageSpeedSubElement[i]));
      }
      return temp;
    }
 }
