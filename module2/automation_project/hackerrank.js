const puppeteer = require("puppeteer");
const mail = "cawosad436@aikusy.com";
const pass = "ush@_1234";
let browserpromise = puppeteer.launch({ headless: false, defaultViewport: null,args: ['--start-fullscreen'] }
);// this will promise us to open the browser

let page;

browserpromise.then(function(browser)
{
    console.log("browser is opened");
    let pagepromise = browser.newPage();
    return pagepromise;
}).then(function(pageInstance){
    console.log("page is opened");
    page = pageInstance;
    let urlpromise = page.goto('https://www.hackerrank.com/');
    return urlpromise;
}).then(function()
{
return waitandclick('ul.menu a');
}).then(function(){
    let waitpromise = page.waitForSelector(".fl-module-content.fl-node-content .fl-button");
    return waitpromise;
}).then(function(){
    let domclickpromise = page.evaluate(function(){
        let btns = document.querySelectorAll(".fl-module-content.fl-node-content .fl-button");
        btns[1].click();
        return;
    });
    return domclickpromise;
}).then(function(){
    let waitpromise = page.waitForSelector("#input-1");
    return waitpromise;
}).then(function(){
    let mailtypedpromise = page.type("#input-1",mail,{delay:100});
    return mailtypedpromise;
}).then(function(){
    let passtypedpromise = page.type("#input-2",pass,{delay:100});
    return passtypedpromise;
}).then(function(){
    let clickpromise = page.click('button[data-analytics="LoginPassword"]');
    return clickpromise;
}).then(function()
{
   return waitandclick('[data-automation="algorithms"]');
}).then(function(){
    return page.waitForSelector(".filter-group");
}).then(function(){
    let domselectpromise = page.evaluate(function(){
        let alldivs = document.querySelectorAll(".filter-group");
        let div = alldivs[3];
        let clickselector = div.querySelector(".ui-checklist-list-item input");
        clickselector.click();
        return;
    })
    return domselectpromise;
}).then(function(){
    console.log("warmup selected");
    return page.waitForSelector('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');

})
.then(function(){

})

function waitandclick(selector)
{
    return new Promise(function(resolve,reject){
        let waitpromise = page.waitForSelector(selector);
        waitpromise.then(function(){
            let clickpromise = page.click(selector);
            return clickpromise;
        }).then(function(){
            resolve();
        });
    })
}



