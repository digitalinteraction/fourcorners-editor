/**
 * Created by Tim Osadchiy on 13/12/2016.
 */

"use strict";

module.exports = function (text, format) {
    if (!(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
        return text;
    }
    var lines = [
            "Download instructions for Safari Users:",
            "1. Press ⌘ + S",
            "2. Type file name with yaml extension in 'Export As'. Example: YourFileName.yaml",
            "3. Select the folder to save in 'Where'. Example: Downloads",
            "4. Select 'Page Source' in 'Format'."
        ],
        formatFnMap = {
            yaml: formatForYaml,
            xml: formatForXml
        },
        instructions = lines.map(formatFnMap[format]).join("");
    return [instructions, text].join("\n");
};

function formatForYaml(line, index) {
    return "# " + line + "\n";
}

function formatForXml(line, index, array) {
    return index == 0 ? "<!--\n" : "" + line + (index == array.length - 1 ? "\n-->\n" : "\n");
}
