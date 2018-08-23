var Crawler = require("crawler");
var clc = require("cli-color");

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
           
            // Fetching Values from Cricbuzz Server
           
            var matchHeader = $(".cb-lv-main").first().children(".cb-lv-scr-mtch-hdr").text();
            var scoreCard = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children().first().text();
            var scoreCard = scoreCard.split("  •  ")
            var liveCommentary = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-live").text();
            var matchDecision = $(".cb-lv-main").first().find(".cb-scr-wll-chvrn").children(".cb-text-complete").text();
            
            //Printing Result 
            
            console.log("\n");
            console.log("       🏏 CriCLI 🏏");
            console.log(clc.redBright(matchHeader));
            console.log("--------------------------");
            console.log(clc.cyanBright(scoreCard[0]));
            console.log(clc.cyanBright(scoreCard[1]));
            if(liveCommentary){
                console.log(liveCommentary);
            }
            if(matchDecision){
                console.log("🎉 " +clc.greenBright(matchDecision)+" 🎉");
            }
            console.log("--------------------------");
            console.log("\n");
        }
        done();
    }
});

c.queue('https://www.cricbuzz.com/cricket-match/live-scores');

module.exports = {c};