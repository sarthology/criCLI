#! /usr/bin/env node
const program = require('commander');
var crawler = require('./crawler');

program
  .version('0.1.0')

program
    .command("live")
    .alias("l")
    .action(()=>{
        crawler
    })

program.parse(process.argv);
