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
            this.toss = JSONData.toss;
            this.umpireName = JSONData.official;
            this.commentary = JSONData.comm_lines;
            this.state = JSONData.state;


            // Header 

            console.log("\n");
            console.log("\t\t🏏 CriCLI 🏏");
            
            // TEAM XENOX 
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
                // Check For Toss
                if (option.includes("t")) {
                    console.log(clc.blueBright(JSONData.toss.winner + " won the toss and opted for " + JSONData.toss.decision));
                }


                // Print Match Summary
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
                            console.log(clc.cyanBright(JSONData.team2.s_name + " : ") + clc.yellowBright(this.score.bowling.score));
                        }
                    }


                    console.log("-------------------------------------------");

                }


                // Print Result if available
                if (this.status)
                    console.log(clc.cyanBright("\nResult: 🎉  ") + clc.redBright(this.status) + " 🎉 \n");



                // Print Recent Over
                if (option.includes("r"))
                    console.log("Recent: " + clc.yellowBright(this.score.prev_overs))
            }


            // -------------------    MATCH CONCLUDED BLOCK  ENDED ----------------------


            //--------------------  MATCH TOSS BLOCK --------------------------------- 
            else if (this.state == 'toss') {
                if (this.toss)
                    console.log(clc.cyanBright("\n🎉  ") + clc.yellowBright(this.toss.winner) + " won the toss and opted for " + clc.yellowBright(this.toss.decision) + " 🎉\n");


            }



            // -------------------    MATCH TOSS BLOCK  ENDED----------------------


            //--------------------  MATCH LIVE BLOCK --------------------------------- 
            else if (this.state == 'inprogress' || this.state == 'innings break') {

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

                
                if (this.status && option.includes("t"))
                    console.log(clc.cyanBright("Match Status: " + this.status));

                // Current Run Rate
                if (this.score.crr)
                    console.log(clc.greenBright("CRR: " + this.score.crr));


                // BOWLING AND BATTING SCORECARD
                if (this.score.batsman && option.includes("s")) {
                    console.log("----------     Batting Stats     ----------");

                    // On strike Batsman
                    if (this.score.batsman[0] && this.score.batsman[0].strike == "1") {
                        var strikebatid = this.score.batsman[0].id

                        for (i in JSONData.players) {
                            // console.log(i);
                            if (JSONData.players[i].id == strikebatid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name + "*") + clc.cyanBright("  R: ") + clc.yellowBright(this.score.batsman[0].r) + clc.cyanBright(" B: ") + clc.yellowBright(this.score.batsman[0].b) + clc.cyanBright(" 4s: ") + clc.yellowBright(this.score.batsman[0]['4s']) + clc.cyanBright(" 6s: ") + clc.yellowBright(this.score.batsman[0]['6s']))

                            }
                        }

                    }
                    //  Off strike bastsman
                    else if (this.score.batsman[0] && this.score.batsman[0].strike == "0") {
                        var strikebatid = this.score.batsman[0].id

                        for (i in JSONData.players) {
                            // console.log(i);
                            if (JSONData.players[i].id == strikebatid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name) + clc.cyanBright("  R: ") + clc.yellowBright(this.score.batsman[0].r) + clc.cyanBright(" B: ") + clc.yellowBright(this.score.batsman[0].b) + clc.cyanBright(" 4s: ") + clc.yellowBright(this.score.batsman[0]['4s']) + clc.cyanBright(" 6s: ") + clc.yellowBright(this.score.batsman[0]['6s']))

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

                    // Bowling Stats
                    if (this.score.bowler) {
                        console.log("----------     Bowling Stats     ----------");
                    }
                    // Current bowler
                    if (this.score.bowler[0]) {
                        var strikebowlid = this.score.bowler[0].id;

                        for (i in JSONData.players) {
                            if (JSONData.players[i].id == strikebowlid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name + "* ") + clc.cyanBright(" O: ") + clc.yellowBright(this.score.bowler[0].o) + clc.cyanBright(" M: ") + clc.yellowBright(this.score.bowler[0].m) + clc.cyanBright(" R: ") + clc.yellowBright(this.score.bowler[0].r) + clc.cyanBright(" W: ") + clc.yellowBright(this.score.bowler[0].w))
                            }
                        }
                    }
                    // Other end bowler
                    if (this.score.bowler[1]) {
                        var nonstrikebowlid = this.score.bowler[1].id;

                        for (i in JSONData.players) {
                            if (JSONData.players[i].id == nonstrikebowlid) {
                                console.log(clc.yellowBright(JSONData.players[i].f_name) + clc.cyanBright(" O: ") + clc.yellowBright(this.score.bowler[1].o) + clc.cyanBright(" M: ") + clc.yellowBright(this.score.bowler[1].m) + clc.cyanBright(" R: ") + clc.yellowBright(this.score.bowler[1].r) + clc.cyanBright(" W: ") + clc.yellowBright(this.score.bowler[1].w))

                            }
                        }

                    }
                }


                //  Recent Score
                if (this.score.prev_overs && option.includes("r")) {
                    console.log("-------------------------------------------");
                    console.log(clc.cyanBright("Recent: " + this.score.prev_overs));
                }

                // Partnership
                if (this.score.prtshp)
                    console.log("Partnership: " + clc.blueBright(this.score.prtshp))

            }
            //--------------------  MATCH LIVE BLOCK ENDED --------------------------------- 

            //--------------------  No fetch Data Block--------------------------------- 

            else {
                console.log("-------------------------------------------");
                console.log("\n\t☹️  Unable to Fetch Data !! ☹️\n");
                console.log("-------------------------------------------");

            }


            //-------------------- END NO FETCH BLOCK ------------------------------- 
            
            //--------------------  Commentary ---------------------------------
            
            if (JSON.stringify(this.commentary[0].comm) && option.includes("c")) {
                console.log("------------     Commentary     -----------");
                var comments = this.commentary[0].comm;
                comments = comments.replace(/<(.|\n)*?>/g, '');
                console.log("Commentary: " + clc.yellowBright(this.commentary[0].o_no) + " : " + clc.greenBright(comments));
                console.log("-------------------------------------------");

            }

            //--------------------  End of Commentary ---------------------------------
            //--------------------  COMMON DETAILS --------------------------------- 
            // Venue details
            if (this.venue.name)
                console.log(clc.cyanBright("\nAt " + this.venue.name + " in " + this.venue.location))
            
            // Umpire details
            if (this.umpireName && option.includes("u"))
                console.log("Umpires: " + clc.blueBright(this.umpireName.umpire1.name + ", " + this.umpireName.umpire2.name));

            console.log("\n");
            //--------------------  End Common Details --------------------------------- 
            
        

             //--------------------  End of IF statement ---------------------------------
        }
             //--------------------  End of response block ---------------------------------
    })
     //--------------------  End of Function ---------------------------------
}

module.exports = {matchStats}