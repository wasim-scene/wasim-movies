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
        } else {
            content += `<li><a href="${relativeItemPath}">${item.name}</a></li>`;
        }
    });

    content += `</ul></body></html>`;

    return content;
}

const moviesDir = path.join(__dirname, 'movies');
const indexContent = generateIndex(moviesDir, 'movies');
fs.writeFileSync('index.html', indexContent);
