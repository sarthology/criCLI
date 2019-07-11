#! /usr/bin/env node
const program = require('commander');

var options = [];
program
.version('1.1.0')
.option('-l, --live', 'Live')
.option('-lu, --live-updates', 'Live Updates')
.option('-f, --frequency <frequency>', 'Frequency of updates in seconds')
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

if (program['live-updates'] || program.all) 
{
  options.push("lu");
}

if (program.frequency) {
  options.frequency = program.frequency * 1000;  
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

var MatchIndex = require('./MatchIndex')
MatchIndex.checkMatchAndDisplay(options);

program.parse(process.argv);

