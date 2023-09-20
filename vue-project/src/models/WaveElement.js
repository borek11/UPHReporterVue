//import WebLinks from '../models/WebLinks'
import WaveSubElement from '../models/WaveSubElement.js'
export default class WaveElement {
    constructor(id, elementName,  description, typeOfResult) {
        this.id = id;
        this.elementName = elementName;
        this.description = description;
        this.typeOfResult = typeOfResult;
        this.waveSubElement = [];
    }

    static fromResponse(response){
      let temp = new WaveElement();      
      
      temp.id = response.id;
      temp.elementName = response.elementName;
      temp.description = response.description;
      temp.typeOfResult = response.typeOfResult;
      // console.log(response)
      for(let i = 0; i < response.waveSubElements.length; i++){
        temp.waveSubElement.push(WaveSubElement.fromResponse(response.waveSubElements[i]));
      }
      return temp;
    }
 }
