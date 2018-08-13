module.exports = (plugin) => {
    const nvim = plugin.nvim;
    plugin.setOptions({
        dev: true,
    });
    function onBufWrite() {
        console.log("Buffer written!");
    }

    plugin.registerAutocmd("BufWritePre", onBufWrite, {
        pattern: "*",
    });

    function getNext(s) {
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

    function getPrev(s) {
        return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a) {
            var c = a.charCodeAt(0);
            switch (c) {
                case 65:
                    return "Z";
                case 97:
                    return "z";
                default:
                    return String.fromCharCode(--c);
            }
        });
    }

    async function nextLetter(args, range) {
        // a
        const currentPos = await plugin.nvim.window.cursor;
        const buffer = await plugin.nvim.buffer;
        let lines = await buffer.getLines({
            start: currentPos[0] - 1,
            end: currentPos[0],
        });
        if (lines.length > 0) {
            let newLine = lines[0];
            let letter = newLine[currentPos[1]];
            let nextLetter = getNext(letter);
            newLine = [
                newLine.slice(0, currentPos[1]) +
                    nextLetter +
                    newLine.slice(currentPos[1] + 1, newLine.length),
            ];
            await buffer.setLines(newLine, {
                start: currentPos[0] - 1,
                end: currentPos[0],
            });
        }
    }

    async function prevLetter(args, range) {
        // a
        const currentPos = await plugin.nvim.window.cursor;
        const buffer = await plugin.nvim.buffer;
        let lines = await buffer.getLines({
            start: currentPos[0] - 1,
            end: currentPos[0],
        });
        if (lines.length > 0) {
            let newLine = lines[0];
            let letter = newLine[currentPos[1]];
            let nextLetter = getPrev(letter);
            newLine = [
                newLine.slice(0, currentPos[1]) +
                    nextLetter +
                    newLine.slice(currentPos[1] + 1, newLine.length),
            ];
            await buffer.setLines(newLine, {
                start: currentPos[0] - 1,
                end: currentPos[0],
            });
        }
    }
    plugin.registerCommand("IncLetter", nextLetter, {
        sync: false,
        range: "",
        nargs: "*",
    });

    plugin.registerCommand("DecLetter", prevLetter, {
        sync: false,
        range: "",
        nargs: "*",
    });
};
