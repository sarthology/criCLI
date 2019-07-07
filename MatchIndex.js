//fetching the Match Id from the URI link


const Crawler = require("crawler");
const { matchStats } = require("./MatchData");

const crawler = new Crawler();

const callbackFunction = options => (error, res, done) => {
    if (error) {
        console.log(error);
    }
    else {
        // Extract Details drom webpage
        const $ = res.$;
        const header = $(".cb-tms-itm").first().find(".cb-schdl").first().find('a');
        let headerLink = header[0].attribs.href;
        headerLink = headerLink.split('/');
        const MatchId = headerLink[2];
        const matchUrlLink = `https://www.cricbuzz.com/match-api/${MatchId}/commentary.json`;
        matchStats(matchUrlLink, options);
    }
    done();
}

function queue(criclink, options) {
    crawler.queue([{
        uri: criclink,
        maxConnections: 10,
        callback: callbackFunction(options),
    }]);
}

function crawlerFunction(criclink, options) {
    if (options.includes('lu')) {
        queue(criclink, options);
        setInterval(() => {
            // clear console and set up a new queued object
            process.stdout.write('\u001B[2J\u001B[0;0f');
            queue(criclink, options);
        }, options.frequency || 30000);
    } else {
        queue(criclink, options);
    }
}

module.exports = { crawlerFunction }