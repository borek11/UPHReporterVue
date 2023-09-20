export default class WebLinks {
    constructor(webName, domainName, date) {
      this.webName = webName;
      this.domainName = domainName;
      this.date = date;
    }
  }

// import {Model, Collection} from 'vue-mc'

// /**
//  * Task model
//  */
// class PSIReport extends Model {

//     // Default attributes that define the "empty" state.
//     defaults() {
//         return {
//           webName: '',
//           domainName: '',
//           date: '',
//         }
//     }
// }


// import { getParent, types } from "vue-data-model";

// const Report = types.vue({
//   data() {
//     return {
//       webName: '',
//       domainName: '',
//       date: ''
//   }

//   // computed: {
//   //   length() {
//   //     return this.name.length;
//   //   }
//   // },

//   // methods: {
//   //   toggle() {
//   //     this.isDone = !this.isDone;
//   //   },

//   //   remove() {
//   //     getParent(this, 2).remove(this);
//   //   }
//   }
// });
// export default Report;
