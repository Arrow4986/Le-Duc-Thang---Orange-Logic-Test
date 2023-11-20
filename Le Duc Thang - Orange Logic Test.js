//TEST 1
function StringChallenge1(str) {
    const [pattern, testStr] = str.split(" ");
    let tempRegex = pattern
            .replace(/\+/g, '[a-zA-Z]')
            .replace(/\$/g, '[1-9]');
    let count = 0;
    for (let i = 0; i < tempRegex.length; i++) {
        if (tempRegex[i] === '*') {
            count++;
            if ( tempRegex[i+1] !== "{") tempRegex = tempRegex.replace(tempRegex[i], `(\\w)\\${count}\\${count}`);
            if ( tempRegex[i+1] === "{") {
                let times = tempRegex[i+2];
                let pat = `\\${count}`;
                tempRegex = tempRegex.slice(0, i+1) + tempRegex.slice(i+4); //Remove '{n}' characters
                tempRegex = tempRegex.replace(tempRegex[i], `(\\w)${pat.repeat(times-1)}`); //Replace * with appropriate number of repeated characters
            }
        }
    }
    const regex = new RegExp(tempRegex);
    return regex.test(testStr);
}
console.log(StringChallenge1("$**+* 9mmmrrrkbbb"));
console.log(StringChallenge1("$**+*{5} 9mmmrrrkbbbbb"));
console.log(StringChallenge1("$**{4}+* 9mmmrrrrkbbb"));

//TEST 2
function StringChallenge2(str) {
    const regex = /<\/?[biempdiv]+>/g;
    let stack = [];
    let match;

    while (match = regex.exec(str)) {
        const tag = match[0];
        //If the tag is opening tag, push the tag to the stack. If it is closing tag, compare it with opening tag
        if (tag[1] === "/") {
            const openTag = stack.pop();
            if (openTag.slice(1) !== tag.slice(2)) {
                return openTag;
            }
        } else stack.push(tag);
    }
    if (stack.length === 0) return true;
    else return stack[0];
}
console.log(StringChallenge2('<div><b><p>hello world</p></b></div>'));
console.log(StringChallenge2('<div><i>hello</i>world</b>'));
