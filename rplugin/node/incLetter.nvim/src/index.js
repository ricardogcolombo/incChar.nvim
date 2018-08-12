module.exports = plugin => {
    const nvim = plugin.nvim;

    function onBufWrite() {
        console.log("Buffer written!");
    }

    plugin.registerAutocmd("BufWritePre", onBufWrite, {
        pattern: "*"
    });

    function changeLetter(s) {
        return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
            var c = a.charCodeAt(0);
            switch (c) {
                case 90:
                    return "A";
                case 122:
                    return "a";
                default:
                    return String.fromCharCode(++c);
            }
        });
    }
    async function nextLetter(args, range) {
        // a
        const currentPos = await plugin.nvim.window.cursor;
        const buffer = await plugin.nvim.buffer;
        let lines = await buffer.getLines({
            start: currentPos[0] - 1,
            end: currentPos[0]
        });
        debugger;
        if (lines.length > 0) {
            let newLine = lines[0];
            let letter = newLine[currentPos[1]];
            let nextLetter = changeLetter(letter);
            newLine = [newLine.slice(0, currentPos[1]) + nextLetter + newLine.slice(currentPos[1] + 1, newLine.length)]
            await buffer.setLines(newLine, {
                start: currentPos[0] - 1,
                end: currentPos[0]
            });
        }
    }
    plugin.registerCommand("IncLetter", nextLetter, {
        sync: false,
        range: "",
        nargs: "*"
    });
};
