module.exports=class{
    #sqlite;
    #db;
    #functions;
    constructor(id){
        this.id = id;
        this.#sqlite = require("sqlite3").verbose()
        this.#db = new this.#sqlite.Database("db.db")
        this.#functions = require("./functions")
    }
    getparents(callback){
        this.#db.all(`Select * from relationships order by child`,(err,rows)=>{
            var find=0;
            var id=this.id;
            var chain = [];
            while(find!=-1){ 
                find = this.#functions.binarysearchjson(parseInt(id),rows,"child");
                if(find!=-1){
                    chain.unshift(rows[find].parent);
                    id = rows[find].parent;
                }

            }
            callback(chain)
        })
    }
    addchild(id){
        this.#db.all(`Select * from relationships where parent=? AND child=?`,[this.id,id],(err,rows)=>{
            if(rows.length>0)
                this.#db.run(`INSERT INTO "main"."relationships"("parent","child") VALUES (?,?);`,[this.id,id],(err)=>{
                    if(err)
                        console.log(err);
                })
        })
    }
    getchilds(callback){
        this.#db.all(`Select * from relationships where parent=?`,[this.id],(err,rows)=>{
            callback(rows)
        })
    }
    removeparent(callback){
        this.#db.run(`Delete from relationships where child=?`,[this.id],err=>{
            if(err)
                console.error(err);
                callback();
        })
    }
    setparent(id){
        this.removeparent(()=>{


                this.#db.run(`INSERT INTO "main"."relationships"("parent","child") VALUES (?,?);`,[id,this.id],(err)=>{
                    if(err)
                        console.log(err);
                })
            })
    }
}