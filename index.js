#! /usr/bin/env node
const program = require('commander');


var criclnk = "https://www.cricbuzz.com/cricket-match/live-scores";
var options = [];
program
.version('1.1.0')
.option('-l, --live', 'Live')
.option('-c, --commentary', 'Commentary')
.option('-s, --scorecard', 'Scorecard')
.option('-u, --umpires', 'Umpires')
.option('-r, --recent', 'Recent')
.option('-t, --toss', 'Toss')
.option('-a, --all', 'All')

.parse(process.argv);

if (program.live || program.all) 
{
  options.push("l");
}

if (program.commentary || program.all) 
{
  options.push("c");

}
if (program.scorecard || program.all) 
{
  options.push("s");

}
if (program.umpires || program.all) 
{
  options.push("u");
}
if (program.recent || program.all) 
{
  options.push("r");

}
if (program.toss || program.all)
{
  options.push("t");

}
if (!program.live && !program.commentary && !program.scorecard && !program.umpires && !program.recent && !program.toss && !program.all)
{
  options.push("l");
}

var MatchIndex =  require('./MatchIndex')
MatchIndex.crawlerFunction(criclnk, options);

program.parse(process.argv);