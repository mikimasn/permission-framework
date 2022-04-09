module.exports=class{
    #sqlite;
    #db;
    #functions;
    #relationships;
    constructor(id){
        this.id =id;
        this.#sqlite = require("sqlite3").verbose()
        this.#db = new this.#sqlite.Database("db.db")
        this.#functions = require("./functions")
        this.#relationships = require("./relationships");
    }
    setperm(perm,status){
     this.#db.all("Select * from perm where id=? AND perm=?",[this.id,perm],(err,rows)=>{
         if(rows === undefined||rows.length==0)
            this.#db.run(`INSERT INTO "main"."perm"("id","perm","status") VALUES (?,?,?);`,[this.id,perm,status?"1":"0"])
        else
            this.#db.run(`UPDATE "main"."perm" SET "perm"=?, "status"=? WHERE id=? AND perm=?`,[perm,status?"1":"0",this.id,rows[0].perm])
     })   
    }
    removeperm(perm){
        this.#db.run(`Delete from perm where id=? and perm=?`,[this.id,perm],err=>{
            if(err)
                console.error(err); 
        })
    }
    getperm(perm,callback,parents=undefined,indexes=undefined){
            if(parents==undefined)
                var id=this.id
            else
                var id = parents[parents.length-1]
            if(indexes==undefined)
                indexes = [];
            this.#db.all(`Select * from perm order by perm,id`,(err,rows)=>{
                var split = perm.split(".");
                var orgperm = perm;
                for(var n=-1;n<split.length;n++){
                    if(n>=0){
                        perm = this.#functions.tablejoin(split.slice(0,split.length-i-1),".");
                        perm += (perm!=""?".":"")+"*";}
                    if(indexes[perm]===undefined){
                        var finded = this.#functions.binarysearchtextjson(rows,perm,"perm")
                        if(finded>-1){
                        var i=finded;
                    while(rows[i]!=undefined&&rows[i]["perm"]==rows[finded]["perm"]){
                        
                        i--;
                    }
                    var start = i+1;
                    var i=finded;
                    while(rows[i]!=undefined&&rows[i]["perm"]==rows[finded]["perm"]){
                        i++;
                    }
                    var end = i-1;
                    indexes[perm]={start:start,end:end}
                }
                else
                    indexes[perm]={start:0,end:-1}
                }
                var permfinded;
                if(indexes[perm].end==-1)
                    permfinded = -1;
                else 
                 permfinded = this.#functions.binarysearchjson(parseInt(id),rows.slice(indexes[perm].start,indexes[perm].end+1),"id")
                if(permfinded==-1){
                    if(n+1>=split.length){
                    if(parents==undefined){
                        var relation = new this.#relationships(id)
                        relation.getparents(chain=>{
                        if(chain==[]){
                            callback(false)
                        }
                        else
                            this.getperm(orgperm,callback,chain,indexes)
                        })
                    }
                    else{
                        
                        if(parents[parents.length-1]==id)
                            parents.pop();
                        if(parents.length==0){
                            callback(false)
                        }
                            
                        else{
                            this.getperm(orgperm,callback,parents,indexes)
                        }
                    }
                }}
                else{
                    callback(rows[permfinded].status==1?true:false)
                    return;
                }
            }
                    
                })
    }
}