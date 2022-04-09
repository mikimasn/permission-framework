var perm = require("./permission")
var relation = require("./relationships")
module.exports = class{
    #relation;
    #perm;
    
    constructor(id){
        this.id = id;
        this.#relation = require("./relationships")
        this.#perm = require("./permission")
    }
          /**
   * Return permission object
   * @returns {?perm}
   * @readonly
   */
    get permission(){
        return new this.#perm(this.id)
    }
      /**
   * Returns relationships object
   * @returns {?relation}
   * @readonly
   */
    get relationships(){
        return new this.#relation(this.id)
    }
}