function solve(input) {
  let message = input.shift().split('');
  for (const line of input) {
    let [command, el1, el2] = line.split('|');
    if (command === 'Decode') {
      console.log(`The decrypted message is: ${message.join('')}`);
      break;
    } else if (command === 'Move') {
      let letters = message.splice(0, el1);
      message.push(...letters);
    } else if (command === 'Insert') {
      message.splice(el1, 0, ...el2);
    } else if (command === 'ChangeAll') {
      for (let i = 0; i < message.length; i++) {
        if (message[i] === el1) {
          message[i] = el2;
        }
      }
    }
  }
}

solve(['owyouh', 'Move|2', 'Move|3', 'Insert|3|are', 'Insert|9|?', 'Decode']);
