#!/usr/bin/env node
import core from '@actions/core';

async function run() {
  const commitMessage = core.getInput('commit-message');
  const possibleInstructions = core
    .getInput('possible-instructions')
    .split(',');
  const instructionsKeyword = core.getInput('instructions-keyword');

  const pattern = new RegExp(`${instructionsKeyword}(\\w+)`);
  const patternMatch = commitMessage.match(pattern);

  if (patternMatch === null) {
    console.log('No instruction found');
    core.setOutput('result', 'no-instruction');
    return;
  }

  const result = patternMatch[1];

  if (possibleInstructions.includes(result)) {
    console.log(result);
    core.setOutput('result', result);
  } else {
    console.log('Instruction not in the list of possible instructions');
    core.setOutput('result', 'invalid-instruction');
  }
}

run();
