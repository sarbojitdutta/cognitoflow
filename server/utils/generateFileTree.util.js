import fs from 'fs';
import path from 'path';

const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'coverage', 'logs', 'tmp'];
const IGNORE_FILES = ['.DS_Store', 'package-lock.json', 'yarn.lock', '.env'];

export const generateFileTree = (dirPath, prefix = '') => {
    let output = '';

    let items
    try{
        items = fs.readdirSync(dirPath);
    }catch(e){
        return ''
    }

    const filteredItems = items.filter(item => {
        !IGNORE_DIRS.includes(item) && !IGNORE_FILES.includes(item)
    })

    filteredItems.forEach((item, index) => {
        const isLast = index === filteredItems.length - 1
        const fullPath = path.join(dirPath, item)
        output += `${prefix}${isLast ? '└── ' : '├── '}${item}\n`
        if (fs.statSync(fullPath).isDirectory()) {
            output += generateFileTree(fullPath, prefix + (isLast ? '    ' : '│   '))
        }
    })
    return output
}