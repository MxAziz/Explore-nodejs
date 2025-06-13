const path = require("path");
const fs = require("fs");
console.log(process.argv); // process.argv diye amra command line theke input nite pari
// process.argv ekta array return kore, jekhane prothom dui ta element hobe node executable er path and script er path

const InputArguments = process.argv.slice(2);

const text = InputArguments.join(" ");

if (!text) {
    console.error("Please provide some text to log.");
    process.exit(1); // text na thakle server ta jeno close kore dei
}
console.log(text);

const filePath = path.join(__dirname,  "log.txt");

fs.appendFile(filePath, text, { encoding: "utf-8" }, () => {
    console.log("Text logged successfully!");
});

console.log(filePath);