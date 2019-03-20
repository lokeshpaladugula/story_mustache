var http=require("http");
const template = require("mustache");
const express = require('express');
const path = require('path');
var app = require('express')();
app.use("/", express.static(path.join(__dirname, "./view")));
app.get('/Story/run/:id', (req,res) =>{
    var Number = req.params.id;
    console.log(Number);
    const fs = require('fs');
    var fun = getmypage(Number);
    
    res.send(fun);
});
function getmypage(Number){
    const fs = require('fs');
    var data = fs.readFileSync('view/story.json', (err) => {if (err) throw err;});
    let data1 = JSON.parse(data);
    if(Number == 1){
        var pageData = { "title_eng": data1.title_eng,
                         "title_tel": data1.title_tel,
                         "next_link": Number -1 +2,
                         "cover": data1.cover_img,
                        };
            var page = fs.readFileSync('view/title.mustache','utf8', (err) => {if (err) throw err;});
            var myPage = template.render( page.toString(), pageData); 
            console.log(myPage);
            return (myPage);
    }
    else if(Number >= 2){
        var pages = data1.pages
        var currentPage = pages[Number - 2];
        if(currentPage == null){
            var pageData = { "previous_link": Number -1
            
            };
            var page = fs.readFileSync('view/end.mustache','utf8', (err) => {if (err) throw err;});
            var myPage = template.render( page.toString(), pageData); 
            console.log(myPage);
            return (myPage);
        }
        var pageData = { "english": currentPage.english,
                          "telugu": currentPage.telugu,
                          "image": currentPage.image,
                          "next_link": Number -1 +2,
                          "previous_link": Number - 1
    };
    var page = fs.readFileSync('view/pages.mustache','utf8', (err) => {if (err) throw err;});
    var myPage = template.render( page.toString(), pageData); 
    console.log(myPage);
    return (myPage);
    }
}
app.listen(3000, () => {
    console.log('server started');
  });