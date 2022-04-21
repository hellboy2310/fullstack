const puppeteer = require("puppeteer");
const mail = "cawosad436@aikusy.com";
const pass = "ush@_1234";
const code = require('./code');
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
    return page.waitForSelector('.challenges-list .js-track-click.challenge-list-item');

})
.then(function(){
  let arrpromise = page.evaluate(function(){
      let arr = [];
        let aTags = document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        for(let i=0;i<aTags.length;i++)
        {
            let link = aTags[i].href;
            console.log(link);
            arr.push(link);
        }
        return arr;
  })
  return arrpromise;
}).then(function(questionsArr){
    console.log(questionsArr);
    let questionpromise = questionSolver(questionsArr[0],code.answers[0]);
    for(let i=1;i<questionsArr.length;i++)
    {
        questionpromise = questionpromise.then(function(){
            let nextQuestionpromise = questionSolver(questionsArr[i],code.answers[i]);
            return nextQuestionpromise;
        })
    }
    return questionpromise;

}).then(function(){
    console.log("all the warm up questions has been submitted");
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

function questionSolver(question,answer)
{
    return new Promise(function(resolve,reject){
        let linkPromise = page.goto(question);
        linkPromise.then(function(){
            return waitandclick('.checkBoxWrapper input');

        }).then(function(){
            return waitandclick('.ui-tooltip-wrapper textarea');
        }).then(function(){
            console.log("on the text area");
            
            let typePromise = page.type('.ui-tooltip-wrapper textarea',answer);
            return typePromise;
        }).then(function(){
                let holdcontrol = page.keyboard.down("Control");
                return holdcontrol;

        }).then(function(){
            let pressA = page.keyboard.press('A');
            return pressA;

        }).then (function(){
            let pressx = page.keyboard.press('X');
            return pressx;
        }).then(function(){
            let upcontrol = page.keyboard.up("Control");
            return upcontrol;
        }).then(function(){
            return waitandclick('.monaco-editor.no-user-select.vs');
        }).then(function(){
            let holdcontrol = page.keyboard.down("Control");
            return holdcontrol;
        }).then(function(){
            let pressA = page.keyboard.press("A");
            return pressA;
        }).then(function(){
            let pressv = page.keyboard.press('V');
            return pressv;
        }).then(function(){
            let upcontrol = page.keyboard.up("Control");
            return upcontrol;
        })
        .then(function(){
            return waitandclick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
        }).then(function(){
            console.log("questions submitted successfully");
        resolve();
        })

    })
}


