const request = require('request');
const jsdom = require('jsdom');
const{JSDOM} = jsdom;

const link = "https://github.com/topics";

request(link,cb);


function cb(error,request,html)
{
    if(error)
    {
        console.log(error);
    }
    else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allAnchortags = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i=0;i<allAnchortags.length;i++)
        {
            let link = allAnchortags[i].href;
            let completeLink = "https://github.com"+link;
            console.log(completeLink);
            request(completeLink,cb2);
        }
    }
}

function cb2(error,request,html)
{
    if(error)
    {
console.log(error);
    }
    else{
const dom = new JSDOM(html);
const document = dom.window.document;
    }
}
