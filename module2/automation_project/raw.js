const puppeteer = require('puppeteer');

let browserpromise = puppeteer.launch({headless:false}); // this will promise us that the browser will get open 

//headless:false makes things visible for us without that we wont be able to see if the browser if open or not

browserpromise.then(function(browser)
{
    console.log("brower is opened");
    let pagepromise = browser.newPage();
    return pagepromise;
}).then(function(page){
    console.log("page is opened");
    let urlpromise = page.goto("https://www.google.com/");
    return urlpromise; 
}).then(function()
{
    console.log("google is opened");
})