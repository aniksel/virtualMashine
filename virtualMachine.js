const fs = require('fs');
const inputText = fs.readFileSync('vm.splm');

const instructions = inputText.toString().split(/ |\r\n/);
instructions.push('exit');

const memory = {};
let instructionPointer = 0;

while (instructions[instructionPointer] !== 'exit') {
  switch (instructions[instructionPointer]) {
    case 'set':
      memory[instructions[instructionPointer + 1]] = parseInt(instructions[instructionPointer + 2]);
      instructionPointer += 3;
      break;
    case 'nok':
      const max = Math.max(memory[instructions[instructionPointer + 1]], memory[instructions[instructionPointer + 2]]);
      let lcm = max;
      while (true) {
        if (lcm % memory[instructions[instructionPointer + 1]] === 0 && lcm % memory[instructions[instructionPointer + 2]] === 0) {
          break;
        }
        lcm += max;
      }
      memory[instructions[instructionPointer + 3]] = lcm;
      instructionPointer += 4;
      break;
    case 'fib':
      function fibonacci(n) {
        if (n <= 1) {
          return n;
        } else {
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
      }
      const num = memory[instructions[instructionPointer + 1]];
      memory[instructions[instructionPointer + 2]] = fibonacci(num);
      instructionPointer += 3;
      break;
    case 'output1':
      console.log(memory[instructions[instructionPointer + 1]]);
      instructionPointer += 2;
      break;
  }
}
