//fetching the Match Id from the URI link

const { matchStats } = require("./MatchData");
const request = require('request-promise-native');
const inquirer = require('inquirer');

const LIVE_MATCHES = 'https://www.cricbuzz.com/match-api/livematches.json';

const checkMatchAndDisplay = (options) => {
    request({
        uri: LIVE_MATCHES,
        json: true,
    })
    .then(({ matches }) => {
        const matchIds = Object.keys(matches);
        const internationals = matchIds.filter(id => matches[id].series.category === 'International');
        const matchOptions = internationals.map(id => {
            const match = matches[id];
            return {
                name: `${match.team1.name} v ${match.team2.name} in ${match.series.name}`,
                value: match.id,
                short: `${match.team1.s_name} v ${match.team2.s_name}`,
            };
        });
        const questions = [
            {
                type: 'list',
                name: 'matchNumber',
                message: 'Choose which match to track scores for:',
                choices: matchOptions,
            }
        ];
        return inquirer.prompt(questions);
    })
    .then(answers => {
        const matchUrlLink = `https://www.cricbuzz.com/match-api/${answers.matchNumber}/commentary.json`;
        if (options.includes('lu')) {
            matchStats(matchUrlLink, options);
            setInterval(() => {
                // clear console and set up a new queued object
                process.stdout.write('\u001B[2J\u001B[0;0f');   
                matchStats(matchUrlLink, options);
            }, options.frequency || 30000);
        } else {
            matchStats(matchUrlLink, options);
        }
    });
}

module.exports = { checkMatchAndDisplay }