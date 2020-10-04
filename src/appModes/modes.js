const {pipeline} = require('stream');
const {createWritableStream, createReadableStream, ProcessSipherStream, AddLineBreak} = require('../streams/streams')

const startAppFullVersion = (input, output, shift, action) => {
    pipeline(createReadableStream(input), new ProcessSipherStream(Number(shift), action),  createWritableStream(output), (error) => {
        if (error) {
            console.log('App error!', error)
        }
        console.log('Processed successfully!')
    })
}

const startAppInputVersion = (input, shift, action) => {
    pipeline(createReadableStream(input), new ProcessSipherStream(Number(shift), action), new AddLineBreak(), process.stdout, (error) => {
        if (error) {
            console.error('App error!', error.message)
        }
    })
}

const startAppOutputVersion = (output, shift, action) => {
    pipeline(process.stdin, new ProcessSipherStream(Number(shift), action),  createWritableStream(output),  (error) => {
        if (error) {
            console.error('App error!', error.message)
        }
    })
}

const startAppTerminalVersion = (shift, action) => {
    pipeline(process.stdin, new ProcessSipherStream(Number(shift), action), process.stdout, (error) => {
        if (error) {
            console.error('App error!', error.message)
        }
    })
}

module.exports = {startAppFullVersion, startAppInputVersion, startAppOutputVersion, startAppTerminalVersion}

