module.exports.tablejoin=(table,separator)=>{
    var str="";
    for(i=0;i<table.length;i++){
        if(i==table.length-1)
         str+=table[i]
        else
            str+=table[i]+separator
    }
    return str;
}
module.exports.binarysearch=(searchElement, searchArray)=> {
    'use strict';

    var stop = searchArray.length;
    var last, p = 0,
        delta = 0;

    do {
        last = p;

        if (searchArray[p] > searchElement) {
            stop = p + 1;
            p -= delta;
        } else if (searchArray[p] === searchElement) {
            // FOUND A MATCH!
            return p;
        }

        delta = Math.floor((stop - p) / 2);
        p += delta; //if delta = 0, p is not modified and loop exits

    }while (last !== p);

    return -1; //nothing found

};
module.exports.binarysearchjson=(searchElement, searchArray,searchdata)=> {
    'use strict';

    var stop = searchArray.length;
    var last, p = 0,
        delta = 0;

    do {
        last = p;

        if (searchArray[p][searchdata] > searchElement) {
            stop = p + 1;
            p -= delta;
        } else if (searchArray[p][searchdata] === searchElement) {
            // FOUND A MATCH!
            return p;
        }

        delta = Math.floor((stop - p) / 2);
        p += delta; //if delta = 0, p is not modified and loop exits

    }while (last !== p);

    return -1; //nothing found

};
module.exports.binarysearchtextjson=(arr,x,searchdata)=>
{
    let l = 0, r = arr.length - 1;
        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            let res = x.localeCompare(arr[m][searchdata]);
               
            // Check if x is present at mid
            if (res == 0)
                return m;
   
            // If x greater, ignore left half
            if (res > 0)
                l = m + 1;
   
            // If x is smaller, ignore right half
            else
                r = m - 1;
        }
   
        return -1;
}