const puppeteer = require('puppeteer');

let browserpromise = puppeteer.launch({headless:false}); // this will promise us that the browser will get open 

//headless:false makes things visible for us without that we wont be able to see if the browser if open or not

browserpromise.then(function(browser)
{
    console.log("brower is opened");
    
})