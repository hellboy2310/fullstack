let fs = require('fs');

let arr = ['./f1.txt','./f2.txt','./f3.txt','./f4.txt','./f5.txt'];

let filepromise = fs.promises.readFile(arr[0]);// we have already managed for arr[0]

for(let i=1;i<arr.length;i++)//here the loop will move from 1 and will go upto less than arr.length
{
    filepromise = filepromise.then(function(data){
        console.log(data+"");
        let nexttfilepromise = fs.promises.readFile(arr[i]);
        return nexttfilepromise; // this return will go to line number 9 where filepromise is mentioned.......
    })
}
//here we have taken care of the last case that means arr[4];
filepromise.then(function(data){
    console.log(data+"");
})