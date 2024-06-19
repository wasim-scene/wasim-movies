const fs = require('fs');
const path = require('path');

function generateIndex(dir, relativePath = '') {
    let content = `<html><body><ul>`;

    const items = fs.readdirSync(dir, { withFileTypes: true });

    items.forEach(item => {
        const itemPath = path.join(dir, item.name);
        const relativeItemPath = path.join(relativePath, item.name);
        
        if (item.isDirectory()) {
            content += `<li><a href="${relativeItemPath}/">${item.name}/</a></li>`;
            content += generateIndex(itemPath, relativeItemPath);
        } else {
            content += `<li><a href="${relativeItemPath}">${item.name}</a></li>`;
        }
    });

    content += `</ul></body></html>`;

    return content;
}

const indexContent = generateIndex('.');
fs.writeFileSync('index.html', indexContent);
