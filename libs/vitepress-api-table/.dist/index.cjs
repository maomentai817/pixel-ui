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
    var markdownTable = "### ".concat(interfaceName, "\n\n| Name | Description | Type | Default |\n| --- | --- | --- | --- |\n");
    var properties = parsePropertyComments(propertiesBlock);
    lodashEs.each(properties, function (propertie) {
        markdownTable += "| ".concat(propertie.propertyName, " | ").concat(propertie.description, " | `").concat(propertie.propertyType.replace(/\|/g, '\\|'), "` | ").concat(propertie.defaultValue, " |\n");
    });
    return markdownTable;
}
// 解析注释和属性
function parsePropertyComments(propertyStr) {
    var props = propertyStr
        .split('/**')
        .map(function (p) { return p.trim(); })
        .filter(function (p) { return p.includes('@property'); });
    var properties = [];
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var prop = props_1[_i];
        var propInfo = {
            propertyName: '',
            propertyType: '',
            description: '',
            defaultValue: '-'
        };
        var nameMatch = prop.match(/@property\s+(\w+)/);
        var descMatch = prop.match(/@description\s+(.*)/);
        var defaultMatch = prop.match(/@default\s+(.*)/);
        // 支持 enum 类型声明
        var typeMatch = prop.match(/@type\s+enum\s*-\s*([^\n]*)/) ||
            prop.match(/@type\s+([^\n]*)/);
        if (nameMatch) {
            propInfo.propertyName = nameMatch[1].trim();
        }
        if (descMatch) {
            propInfo.description = descMatch[1].trim();
        }
        if (defaultMatch) {
            propInfo.defaultValue = defaultMatch[1].trim();
        }
        if (typeMatch) {
            propInfo.propertyType = typeMatch[1].trim();
        }
        if (propInfo.propertyName) {
            properties.push(propInfo);
        }
    }
    return properties;
}

module.exports = apiTableMdPlugin;
