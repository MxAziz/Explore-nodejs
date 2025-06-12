console.log(process.argv);

const InputArguments = process.argv.slice(2);

const text = InputArguments.join(" ");

console.log(text);