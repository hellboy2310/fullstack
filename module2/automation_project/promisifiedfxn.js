function promisifiedfunc()
{
    return new Promise(function(resolve,reject){
        let a = 3;
        let b = 1;
        if(a==b)
        {
            resolve("equal");
        }
        else{
            reject("unequal");
        }
    })
}

let somepromise = promisifiedfunc();
somepromise.then(function(x){
    console.log(x);
})
somepromise.catch(function(err){
    console.log(error);
})