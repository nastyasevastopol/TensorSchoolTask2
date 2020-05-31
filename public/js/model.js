export class Model {
    constructor(data) {
       for(let key in data) {
          this[key] = data[key];
       }
    }
 
   //  get fullName() {
   //     return `{this.title}`;
   //  }
 }