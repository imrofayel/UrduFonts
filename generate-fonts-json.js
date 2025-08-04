import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract frontmatter from markdown files
function extractFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return null;
    
    const frontmatter = {};
    const lines = match[1].split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        const colonIndex = trimmed.indexOf(':');
        if (colonIndex === -1) continue;
        
        const key = trimmed.substring(0, colonIndex).trim();
        let value = trimmed.substring(colonIndex + 1).trim();
        
        // Handle quoted strings
        if ((value.startsWith("'") && value.endsWith("'")) || 
            (value.startsWith('"') && value.endsWith('"'))) {
            value = value.slice(1, -1);
        }
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item => {
                item = item.trim();
                if ((item.startsWith("'") && item.endsWith("'")) || 
                    (item.startsWith('"') && item.endsWith('"'))) {
                    return item.slice(1, -1);
                }
                return item;
            });
        }
        
        // Convert numeric values
        if (!isNaN(value) && value !== '') {
            value = parseInt(value);
        }
        
        frontmatter[key] = value;
    }
    
    return frontmatter;
}

// Function to get font file name from title
function getFontFileName(title) {
    // Map of titles to actual font file names
    const titleToFileName = {
        'AlQalam Ferdos': 'AlQalamFerdaos',
        'AlQalam Fawad': 'AlQalamFawadLight',
        'AlQalam Kashif': 'AlQalamKashifOutline',
        'AlQalam Punjbi': 'AlQalamPunjabi',
        'AlQalam ShahJahan': 'AlQalamShahJahan',
        'AlFars Symbols': 'AlFarsSymbols',
        'Alvi Nastaliq': 'AlviNastaleeq',
        'Arslan Waseem': 'ArslanWessam',
        'Bilal Outline': 'BilalOutline',
        'Diwani': 'DiwaniBent',
        'Farsi Simple': 'FarsiSimpleOutline',
        'Gandhara Suls': 'GandharaSuls',
        'Hussaini Nastaleeq': 'HussainiNastaleeq',
        'Jameel Noori Nastaliq': 'JameelNooriNastaleeq',
        'Jameel Noori Nastaliq Kasheeda': 'JameelNooriNastaleeqKasheeda',
        'KacstTitle': 'KacstTitle',
        'Khat-e-Musarat': 'Khat-e-Musarat',
        'Laiq Nastaleeq': 'LaiqNastaleeq',
        'Mehr Nastaliq': 'MehrNastaliqWeb',
        'Old Antic Outline': 'OldAnticOutlineShaded',
        'Pak Nastaleeq': 'PakNastaleeq',
        'Pencil Nafees': 'PencilNafees'
    };
    
    return titleToFileName[title] || title.replace(/\s+/g, '');
}

// Read all markdown files from content/fonts directory
const fontsDir = path.join(__dirname, 'content', 'fonts');
const files = fs.readdirSync(fontsDir).filter(file => file.endsWith('.md'));

const fonts = [];

for (const file of files) {
    const filePath = path.join(fontsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const frontmatter = extractFrontmatter(content);
    
    if (frontmatter && frontmatter.title) {
        const fileName = getFontFileName(frontmatter.title);
        
        const font = {
            title: frontmatter.title,
            family: frontmatter.family || frontmatter.title,
            urdu: frontmatter.urdu || frontmatter.title,
            styles: frontmatter.styles || ['Regular 400'],
            size: frontmatter.size || 36,
            link: `https://raw.githubusercontent.com/imrofayel/UrduFonts/master/fonts/${fileName}.ttf`
        };
        
        fonts.push(font);
    }
}

// Sort fonts by title
fonts.sort((a, b) => a.title.localeCompare(b.title));

// Write to JSON file
const outputPath = path.join(__dirname, 'data', 'fonts.json');
fs.writeFileSync(outputPath, JSON.stringify(fonts, null, 2), 'utf8');

console.log(`Generated fonts.json with ${fonts.length} fonts`);
console.log(`Saved to: ${outputPath}`);
