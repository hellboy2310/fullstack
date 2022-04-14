const fs = require('fs');

console.log("before");
let f1kapromise = fs.promises.readFile("f1.txt");

f1kapromise.then(function(data)
{
    console.log(data+"");
})

f1kapromise.catch(function(error)
{
    console.log("error");
})
console.log("after");