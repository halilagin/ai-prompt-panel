import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const FileItems = [
        FloatingMenuItem.instance()
            .setTrigger('file://')
            .setId('uploadFile')
            .setLabel('Upload File')
            .setIcon(<ImageIcon size={16} />)
            .setTemplate('📎 **filename.txt** (0.00 KB)'),

        FloatingMenuItem.instance()
            .setTrigger('file://')
            .setId('imageFile')
            .setLabel('Insert Image')
            .setIcon(<ImageIcon size={16} />)
            .setTemplate('![Image](https://)'),

        FloatingMenuItem.instance()
            .setTrigger('file://')
            .setId('documentLink')
            .setLabel('Document Link')
            .setIcon(<LinkIcon size={16} />)
            .setTemplate('📄 [Document](https://)'),

        FloatingMenuItem.instance()
            .setTrigger('file://')
            .setId('codeFile')
            .setLabel('Code File')
            .setIcon(<Code size={16} />)
            .setTemplate(`\`\`\`javascript
// Your code here
\`\`\``),

        FloatingMenuItem.instance()
            .setTrigger('file://')
            .setId('downloadLink')
            .setLabel('Download Link')
            .setIcon(<Minus size={16} />)
            .setTemplate('⬇️ [Download file.pdf](https://)')
    ];
