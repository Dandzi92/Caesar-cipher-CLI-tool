const { program } = require('commander');
const { startAppFullVersion, startAppInputVersion, startAppOutputVersion, startAppTerminalVersion } = require('./src/appModes/modes');

program.storeOptionsAsProperties(false).passCommandToAction(false);

program
    .option('-a, --action <string>')
    .option('-s, --shift <number>')
    .option('-i, --input <string>')
    .option('-o, --output <string>')

program.parse(process.argv);

const passedOptions = program.opts()

const isNecessaryParamsPassed = passedOptions.shift && passedOptions.action
const isOutputAndInputPassed = passedOptions.input && passedOptions.output

if (isNecessaryParamsPassed) {
    if (isOutputAndInputPassed)  startAppFullVersion(passedOptions.input, passedOptions.output, Number(passedOptions.shift), passedOptions.action)
    else if (passedOptions.input)  startAppInputVersion(passedOptions.input, passedOptions.shift, passedOptions.action)
    else if (passedOptions.output)  startAppOutputVersion(passedOptions.output, passedOptions.shift, passedOptions.action)
    else {
        startAppTerminalVersion(passedOptions.shift, passedOptions.action)
    }
}
else {
    process.stderr.write('You have not provided necessary arguments!\n')
}




