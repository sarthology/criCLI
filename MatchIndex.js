//fetching the Match Id from the URI link


var Crawler = require("crawler");
var { matchStats } = require("./MatchData");
var matchUrlLink = "";


function crawlerFunction(criclink, option) {

    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            }
            else {
                // Extract Details drom webpage
                var $ = res.$;
                var header = $(".cb-tms-itm").first().find(".cb-schdl").first().find('a');
                var headerLink = header[0].attribs.href;
                headerLink = headerLink.split('/');
                var MatchId = headerLink[2];
                matchUrlLink = `https://www.cricbuzz.com/match-api/${MatchId}/commentary.json`;
                matchStats(matchUrlLink, option);

            }
            done();
        }
    });
    c.queue(criclink);


}

module.exports = { crawlerFunction }