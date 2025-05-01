'use strict';

var MarkdownIt = require('markdown-it');
var container = require('markdown-it-container');
var fs = require('fs');
var url = require('url');
var path = require('path');
var lodashEs = require('lodash-es');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
var mdit = new MarkdownIt();
var _readFile = function (filename) {
    var __filename = url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)));
    var __dirname = path.dirname(__filename);
    return fs.readFileSync(path.resolve(__dirname, '../../../packages/' + filename)).toString('utf8');
};
var render = function (tokens, idx) {
    var _a, _b;
    var token = tokens[idx];
    var filePath = (_b = (_a = /src=([^\s]+)/.exec(token.info)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim();
    var result = '';
    if (token.nesting === 1) {
        var fileContent = _readFile(filePath !== null && filePath !== void 0 ? filePath : '');
        // 正则表达式匹配接口名称
        var interfaceRegex = /export\s+interface\s+(\w+)/g;
        // 执行匹配并存储所有接口名称
        var match = null;
        while ((match = interfaceRegex.exec(fileContent)) !== null) {
            result += mdit.render(generateMarkdownDocumentation(fileContent, match[1]));
        }
    }
    return result;
};
var apiTableMdPlugin = function (md) {
    md.use(container, 'api-table', { render: render });
};
function generateMarkdownDocumentation(content, interfaceName) {
    var regex = new RegExp("export interface ".concat(interfaceName, " {([\\s\\S]*?)}"), 'm');
    var match = content.match(regex);
    if (!match)
        return 'No interface found';
    var propertiesBlock = match[1];
    var markdownTable = "## ".concat(interfaceName, "\n\n| Name | Description | Type | Default |\n| --- | --- | --- | --- |\n");
    var properties = parsePropertyComments(propertiesBlock);
    lodashEs.each(properties, function (propertie) {
        var _a;
        markdownTable += "| ".concat(propertie.propertyName, " | ").concat(propertie.description, " | `").concat(propertie.propertyType, "` | `").concat((_a = propertie.defaultValue) !== null && _a !== void 0 ? _a : '-', "` |\n");
    });
    return markdownTable;
}
// 解析注释和属性
function parsePropertyComments(propertyStr) {
    var lines = propertyStr.split('\n');
    var properties = [];
    var currentComment = {};
    var parsingComment = false;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        // 开始解析注释块
        if (line.startsWith('/**')) {
            parsingComment = true;
            currentComment = {};
            continue;
        }
        if (parsingComment) {
            var propertyMatch = line.match(/@property\s+([\w$]+)/);
            var typeMatch = line.match(/@type\s+(.*)/);
            var descMatch = line.match(/@description\s+(.*)/);
            var defaultMatch = line.match(/@default\s+(.*)/);
            if (propertyMatch)
                currentComment.propertyName = propertyMatch[1];
            if (typeMatch)
                currentComment.propertyType = typeMatch[1];
            if (descMatch)
                currentComment.description = descMatch[1];
            if (defaultMatch)
                currentComment.defaultValue = defaultMatch[1];
            // 注释块结束
            if (line.endsWith('*/')) {
                parsingComment = false;
            }
            continue;
        }
        // 匹配字段定义（确保有字段名）
        var fieldMatch = line.match(/^(\w+)\??:\s*([^;]+)/);
        if (fieldMatch && currentComment.propertyName === fieldMatch[1]) {
            if (!currentComment.propertyType) {
                currentComment.propertyType = fieldMatch[2].trim();
            }
            if (!currentComment.description) {
                currentComment.description = '-';
            }
            properties.push(currentComment);
            currentComment = {};
        }
    }
    return properties;
}

module.exports = apiTableMdPlugin;
