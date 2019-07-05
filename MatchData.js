var clc = require("cli-color");
const terminalLink = require('terminal-link');





function matchStats(link, option) {

    // GET JSON DATA
    var request = require('request');

    request(link, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var JSONData = JSON.parse(body);
       
       
    //    VARIABLES FOR GET JSON DATA
            this.seriesArray = JSONData.series;
            this.status = JSONData.status;
            this.venue = JSONData.venue;
            this.score = JSONData.score;
      

            // Header 

            console.log("\n");
            console.log("\t\t🏏 CriCLI 🏏");
            const link = terminalLink("Team XENOX", 'https://www.teamxenox.com/');

            console.log("\n\t      \x1b[2m🔥 " + link + " 🔥\x1b[0m");




            // Series Name
            if (this.seriesArray.name)
                console.log("\nTournament: " + clc.redBright(this.seriesArray.name));





            // Check and Print team Names
            if (JSONData.team1.s_name && JSONData.team2.s_name) {
                console.log(clc.greenBright(clc.italic("\n\t\t " + JSONData.team1.s_name)) + " VS " + clc.greenBright(clc.italic(JSONData.team2.s_name)));
            }




            // -------------------  START MATCH NOT STARTED BLOCK ----------------------
            if (this.state == 'preview') {
                console.log("-------------------------------------------");

                console.log("\n\t☹️  Match not Started Yet !! ☹️\n");
                console.log("-------------------------------------------");

            }

            // -------------------  MATCH NOT STARTED BLOCK  ENDED  ----------------------



            //--------------------  START MATCH CONCLUDED BLOCK ------------------------- 
            else if (this.state == 'mom') {

  

                // Print Match Summary
                if (JSONData.team1.s_name && JSONData.team2.s_name) {
                    console.log("\n---------      Match Summary      ---------");
                    if (JSONData.team1.id == this.score.batting.id) {
                        console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.batting.score));
                    }
                    if (JSONData.team2.id == this.score.batting.id) {
                        console.log(clc.cyanBright(JSONData.team2.s_name + " : ") + clc.yellowBright(this.score.batting.score));
                    }
                    if (JSONData.team1.id == this.score.bowling.id) {
                        console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.bowling.score));
                    }
                    if (JSONData.team2.id == this.score.bowling.id) {
                        console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.bowling.score));
                    }
                    console.log("-------------------------------------------");

                }


                // Print Result if available
                if (this.status)
                    console.log(clc.cyanBright("\nResult: 🎉  ") + clc.redBright(this.status) + " 🎉 \n");



          



            //--------------------  MATCH LIVE BLOCK --------------------------------- 
            else if (this.state == 'inprogress') {

                if (JSONData.team1.s_name && JSONData.team2.s_name) {
                    console.log("\n---------      Match Summary      ---------");
                    if (JSONData.team1.id == this.score.batting.id) {
                        console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.batting.score + "/" + this.score.max_overs));
                    }
                    if (JSONData.team2.id == this.score.batting.id) {
                        console.log(clc.cyanBright(JSONData.team2.s_name + " : ") + clc.yellowBright(this.score.batting.score));
                    }
                    if (this.score.bowling) {
                        if (JSONData.team1.id == this.score.bowling.id) {
                            console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.bowling.score));
                        }
                        if (JSONData.team2.id == this.score.bowling.id) {
                            console.log(clc.cyanBright(JSONData.team1.s_name + " : ") + clc.yellowBright(this.score.bowling.score));
                        }
                    }
                    console.log("-------------------------------------------");

                }



                if (this.score.crr)
                    console.log(clc.greenBright("CRR: " + this.score.crr));


                // BOWLING AND BATTING SCORECARD
                if (this.score.batsman && option.includes("s")) {
                    console.log("----------     Batting Stats     ----------");


                    if (this.score.batsman[0] && this.score.batsman[0].strike == "1") {
                        var strikebatid = this.score.batsman[0].id

                        for (i in JSONData.players) {
                            // console.log(i);
                            if (JSONData.players[i].id == strikebatid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name + "*") + clc.cyanBright("  R: ") + clc.yellowBright(this.score.batsman[0].r) + clc.cyanBright(" B: ") + clc.yellowBright(this.score.batsman[0].b) + clc.cyanBright(" 4s: ") + clc.yellowBright(this.score.batsman[0]['4s']) + clc.cyanBright(" 6s: ") + clc.yellowBright(this.score.batsman[0]['6s']))

                            }
                        }

                    }

                    if (this.score.batsman[1] && this.score.batsman[1].strike == "0") {
                        var nonstrikebatid = this.score.batsman[1].id

                        for (i in JSONData.players) {
                            if (JSONData.players[i].id == nonstrikebatid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name) + clc.cyanBright("  R: ") + clc.yellowBright(this.score.batsman[1].r) + clc.cyanBright(" B: ") + clc.yellowBright(this.score.batsman[1].b) + clc.cyanBright(" 4s: ") + clc.yellowBright(this.score.batsman[1]['4s']) + clc.cyanBright(" 6s: ") + clc.yellowBright(this.score.batsman[1]['6s']))
                            }
                        }

                    }

                    if (this.score.bowler) {
                        console.log("----------     Bowling Stats     ----------");
                    }
                    if (this.score.bowler[0]) {
                        var strikebowlid = this.score.bowler[0].id;

                        for (i in JSONData.players) {
                            if (JSONData.players[i].id == strikebowlid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name + "* ") + clc.cyanBright(" O: ") + clc.yellowBright(this.score.bowler[0].o) + clc.cyanBright(" M: ") + clc.yellowBright(this.score.bowler[0].m) + clc.cyanBright(" R: ") + clc.yellowBright(this.score.bowler[0].r) + clc.cyanBright(" W: ") + clc.yellowBright(this.score.bowler[0].w))
                            }
                        }

                    }

                    if (this.score.bowler[1]) {
                        var nonstrikebowlid = this.score.bowler[1].id;

                        for (i in JSONData.players) {
                            if (JSONData.players[i].id == nonstrikebowlid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name) + clc.cyanBright(" O: ") + clc.yellowBright(this.score.bowler[1].o) + clc.cyanBright(" M: ") + clc.yellowBright(this.score.bowler[1].m) + clc.cyanBright(" R: ") + clc.yellowBright(this.score.bowler[1].r) + clc.cyanBright(" W: ") + clc.yellowBright(this.score.bowler[1].w))

                            }
                        }

                    }
                }



         

                if (this.score.prtshp)
                    console.log("Partnership: " + clc.blueBright(this.score.prtshp))

            } 
            //--------------------  MATCH LIVE BLOCK ENDED --------------------------------- 

            //--------------------  No fetch Data --------------------------------- 
             
            else {
                console.log("-------------------------------------------");
                console.log("\n\t☹️  Unable to Fetch Data !! ☹️\n");
                console.log("-------------------------------------------");

            }


            //-------------------- END NO FETCH BLOCK ------------------------------- 
            if (JSON.stringify(this.commentary[0].comm) && option.includes("c")) {
                console.log("------------     Commentary     -----------");
                var comments = this.commentary[0].comm;
                comments = comments.replace(/<(.|\n)*?>/g, '');
                console.log("Commentary: " + clc.yellowBright(this.commentary[0].o_no) + " : " + clc.greenBright(comments));
                console.log("-------------------------------------------");

            }
            //--------------------  COMMON DETAILS --------------------------------- 

            if (this.venue.name)
                console.log(clc.cyanBright("\nAt " + this.venue.name + " in " + this.venue.location))

            

        }
    })

}

module.exports = {
    matchStats
}