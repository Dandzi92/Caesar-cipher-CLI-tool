const caesarShiftUtility =  (amount, action, string) => {
    if (action === 'decode') {
        return caesarShiftUtility(-amount + 26, undefined, string);
    }
    let output = "";
    let str = String(string)

    for (let i = 0; i < str.length; i++) {
        let strElement = str[i];
        if (strElement.match(/[a-z]/i)) {
            const code = str.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                strElement = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }
            else if (code >= 97 && code <= 122) {
                strElement = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
        }
        output += strElement;
    }
    return output;
}

module.exports = {caesarShiftUtility}