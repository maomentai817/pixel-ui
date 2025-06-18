'use strict';

var MarkdownIt = require('markdown-it');
var container = require('markdown-it-container');
var anchor = require('markdown-it-anchor');
var fs = require('fs');
var url = require('url');
var path = require('path');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
var categoryColumns = {
    Props: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) {
                var match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/);
                if (match) {
                    return match[0]; // 原始 HTML 保留
                }
                // 处理普通类型
                return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`");
            }
        },
        { header: 'Default', render: function (p) { return p.defaultValue || '-'; } }
    ],
    Events: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) {
                var match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/);
                if (match) {
                    return match[0];
                }
                return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`");
            }
        }
    ],
    Slots: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } }
    ],
    Expose: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) {
                var match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/);
                if (match) {
                    return match[0]; // 原始 HTML 保留
                }
                // 处理普通类型
                return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`");
            }
        }
    ],
    Directives: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) {
                var match = p.propertyType.match(/^<api-typing\b[^]*?\/>$/);
                if (match) {
                    return match[0];
                }
                return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`");
            }
        }
    ]
};
// markdown-it-anchor 自定义 slug 去重规则, 仿照 vitepress 处理结果
var usedSlugs = new Map();
var slugifyWithDedup = function (s) {
    var base = s
        .trim()
        .toLowerCase()
        .replace(/[^\w\- ]+/g, '')
        .replace(/\s+/g, '-');
    var count = usedSlugs.get(base) || 0;
    usedSlugs.set(base, count + 1);
    return count === 0 ? base : "".concat(base, "-").concat(count);
};
var mdit = new MarkdownIt({
    html: true
});
mdit.use(anchor, {
    level: [1, 2, 3, 4, 5, 6],
    slugify: slugifyWithDedup,
    permalink: anchor.permalink.ariaHidden({
        placement: 'before',
        class: 'header-anchor',
        symbol: '&#x200B;'
    })
});
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
    if (token.nesting === 1 && filePath) {
        var fileContent = _readFile(filePath);
        result += mdit.render(generateComponentDocumentation(fileContent, filePath) // 传入文件路径
        );
    }
    return result;
};
var apiTableMdPlugin = function (md) {
    md.use(container, 'api-table', { render: render });
};
// 生成分类表格的通用方法
function generateCategoryTable(category, properties) {
    var columns = categoryColumns[category];
    return "| ".concat(columns.map(function (c) { return c.header; }).join(' | '), " |\n| ").concat(columns.map(function () { return '---'; }).join(' | '), " |\n").concat(properties
        .map(function (prop) { return "| ".concat(columns.map(function (col) { return col.render(prop); }).join(' | '), " |"); })
        .join('\n'));
}
function generateComponentDocumentation(content, filePath) {
    var _a, _b, _c, _d, _e;
    var matchComp = filePath.match(/components\/([^/]+)\/types(?:\.(\w+))?\.ts$/);
    var componentName = matchComp
        ? matchComp[2]
            ? matchComp[2][0].toUpperCase() + matchComp[2].slice(1)
            : matchComp[1][0].toUpperCase() + matchComp[1].slice(1)
        : 'UnknownComponent';
    // 分类收集接口 (Props/Slots/Emits/Expose), 新增 Directives
    var apiCategories = {
        Props: [],
        Slots: [],
        Events: [],
        Expose: [],
        Directives: []
    };
    // 匹配所有接口并分类
    var interfaceRegex = /export\s+interface\s+(\w+)\s*{((?:[^{}]*|{(?:[^{}]*|{[^{}]*})*})*)}/gm;
    var match;
    while ((match = interfaceRegex.exec(content)) !== null) {
        var interfaceName = match[1], interfaceBody = match[2];
        var properties = parsePropertyComments(interfaceBody);
        // 根据接口后缀分类 (支持 ButtonProps/ButtonEvents/ButtonSlots 等格式)
        if (interfaceName.endsWith('Props')) {
            (_a = apiCategories.Props).push.apply(_a, properties);
        }
        else if (interfaceName.endsWith('Events')) {
            (_b = apiCategories.Events).push.apply(_b, properties);
        }
        else if (interfaceName.endsWith('Slots')) {
            (_c = apiCategories.Slots).push.apply(_c, properties);
        }
        else if (interfaceName.endsWith('Expose')) {
            (_d = apiCategories.Expose).push.apply(_d, properties);
        }
        else if (interfaceName.endsWith('Directives')) {
            (_e = apiCategories.Directives).push.apply(_e, properties);
        }
    }
    // 生成结构化文档
    var markdown = "## ".concat(componentName, " API\n\n");
    // 按类别渲染表格 (只在有内容时显示)
    if (apiCategories.Props.length > 0) {
        markdown += "### Props\n\n".concat(generateCategoryTable('Props', apiCategories.Props), "\n\n");
    }
    if (apiCategories.Events.length > 0) {
        markdown += "### Events\n\n".concat(generateCategoryTable('Events', apiCategories.Events), "\n\n");
    }
    if (apiCategories.Slots.length > 0) {
        markdown += "### Slots\n\n".concat(generateCategoryTable('Slots', apiCategories.Slots), "\n\n");
    }
    if (apiCategories.Expose.length > 0) {
        markdown += "### Expose\n\n".concat(generateCategoryTable('Expose', apiCategories.Expose), "\n\n");
    }
    if (apiCategories.Directives.length > 0) {
        markdown += "### Directives\n\n".concat(generateCategoryTable('Directives', apiCategories.Directives), "\n\n");
    }
    return markdown;
}
// 解析注释和属性
function parsePropertyComments(propertyStr) {
    var _a;
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
        var nameMatch = prop.match(/@property\s+([\w:-]+)/);
        var descMatch = prop.match(/@description\s+(.*)/);
        var defaultMatch = prop.match(/@default\s+(.*)/);
        // 基本类型 / enum / Function / Object 识别, 类型识别增强, {} 定义为基础类型
        var typeMatch = prop.match(/@type\s+({[^}]+}|(\w+)(?:\s*-\s*([^\n]+))?)/);
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
            // 处理 {type} 格式
            if (typeMatch[1].startsWith('{')) {
                var typeContent = typeMatch[1]
                    .replace(/^{(.*)}$/, '$1') // 去除大括号
                    .replace(/\s*\n\s*/g, ' ') // 处理换行
                    .trim();
                propInfo.propertyType = "`".concat(typeContent, "`");
            }
            // 处理 type - details 格式
            else {
                var typeKind = typeMatch[2].toLowerCase();
                var typeDetails = ((_a = typeMatch[3]) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                // 处理特殊类型
                if (['enum', 'function', 'object'].includes(typeKind)) {
                    var safeDetails = typeDetails
                        .replace(/\|/g, '&#124;')
                        .replace(/\\\|/g, '|');
                    propInfo.propertyType = "<api-typing type=\"".concat(typeKind, "\" details=\"").concat(safeDetails, "\" />");
                }
                else {
                    propInfo.propertyType = "`".concat(typeKind, "`");
                }
            }
        }
        if (propInfo.propertyName) {
            properties.push(propInfo);
        }
    }
    return properties;
}

module.exports = apiTableMdPlugin;
