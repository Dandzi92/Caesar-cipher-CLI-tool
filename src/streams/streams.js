const fs = require('fs');
const {caesarShiftUtility} = require("../sipher");
const {Transform} = require('stream');

const createWritableStream = (fileName) => fs.createWriteStream(fileName,{flags: 'a+'})

const createReadableStream = (fileName) => {
    return  fs.createReadStream(fileName)
}

class ProcessSipherStream extends Transform {
    constructor(amount, action) {
        super()
        this.amount = amount;
        this.actionType = action;
    }
    _transform(chunk, enc, done) {
        const processedStringData = caesarShiftUtility(this.amount, this.actionType, chunk)
        done(null, processedStringData)
    }
 }

class AddLineBreak extends Transform {
    _transform(chunk, enc, done) {
        done(null, chunk + '\n')
    }
}

module.exports = {createWritableStream, createReadableStream, ProcessSipherStream, AddLineBreak}