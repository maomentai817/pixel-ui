import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import anchor from 'markdown-it-anchor';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

var categoryColumns = {
    Props: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) { return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`"); }
        },
        { header: 'Default', render: function (p) { return p.defaultValue || '-'; } }
    ],
    Events: [
        { header: 'Name', render: function (p) { return p.propertyName; } },
        { header: 'Description', render: function (p) { return p.description; } },
        {
            header: 'Type',
            render: function (p) { return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`"); }
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
            render: function (p) { return "`".concat(p.propertyType.replace(/\|/g, '\\|'), "`"); }
        }
    ]
};
var mdit = new MarkdownIt();
mdit.use(anchor, {
    level: [1, 2, 3, 4, 5, 6],
    permalink: anchor.permalink.ariaHidden({
        placement: 'before',
        class: 'header-anchor',
        symbol: '&#x200B;'
    })
});
var _readFile = function (filename) {
    var __filename = fileURLToPath(import.meta.url);
    var __dirname = dirname(__filename);
    return readFileSync(resolve(__dirname, '../../../packages/' + filename)).toString('utf8');
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
    var _a, _b, _c, _d;
    var _e;
    var matchComp = filePath.match(/components\/([^/]+)\/types\.(\w+)\.ts$/);
    var componentName = matchComp
        ? matchComp[2][0].toUpperCase() + matchComp[2].slice(1) // 提取 buttonGroup → ButtonGroup
        : ((_e = filePath.split('/').pop()) === null || _e === void 0 ? void 0 : _e.replace(/\.ts$/, '')) || 'UnknownComponent';
    // 分类收集接口（Props/Slots/Emits/Expose）
    var apiCategories = {
        Props: [],
        Slots: [],
        Events: [],
        Expose: []
    };
    // 匹配所有接口并分类
    var interfaceRegex = /export\s+interface\s+(\w+)\s*{([\s\S]*?)}/gm;
    var match;
    while ((match = interfaceRegex.exec(content)) !== null) {
        var interfaceName = match[1], interfaceBody = match[2];
        var properties = parsePropertyComments(interfaceBody);
        // 根据接口后缀分类（支持 ButtonProps/ButtonEmits/ButtonSlots 等格式）
        if (interfaceName.endsWith('Props')) {
            (_a = apiCategories.Props).push.apply(_a, properties);
        }
        else if (interfaceName.endsWith('Emits')) {
            (_b = apiCategories.Events).push.apply(_b, properties);
        }
        else if (interfaceName.endsWith('Slots')) {
            (_c = apiCategories.Slots).push.apply(_c, properties);
        }
        else if (interfaceName.endsWith('Instance')) {
            (_d = apiCategories.Expose).push.apply(_d, properties);
        }
    }
    // 生成结构化文档
    var markdown = "## ".concat(componentName, " API\n\n");
    // 按类别渲染表格（只在有内容时显示）
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
    return markdown;
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
        // const typeMatch =
        //   prop.match(/@type\s+enum\s*-\s*([^\n]*)/) ||
        //   prop.match(/@type\s+([^\n]*)/)
        var typeMatch = prop.match(/@type\s+(enum\s*-\s*)?([^\n]+)/);
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
            var isEnum = !!typeMatch[1];
            var typeValue = typeMatch[2].trim();
            typeValue.startsWith('{') && (typeValue = typeValue.slice(1, -1));
            // 统一格式化枚举类型
            if (isEnum) {
                typeValue = typeValue
                    .replace(/\s*\|\s*/g, ' | ') // 统一竖线间距
                    .replace(/^enum\s*-\s*/i, ''); // 移除残留enum标识
            }
            propInfo.propertyType = typeValue;
        }
        if (propInfo.propertyName) {
            properties.push(propInfo);
        }
    }
    return properties;
}

export { apiTableMdPlugin as default };
