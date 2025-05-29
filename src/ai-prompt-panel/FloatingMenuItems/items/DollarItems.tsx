import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const DollarItems =  [
        FloatingMenuItem.instance()
        .setTrigger('$$')
            .setId('mathBlock')
            .setLabel('Math Block')
            .setIcon(<Code size={16} />)
            .setTemplate('$$\n\n$$'),

        FloatingMenuItem.instance()
        .setTrigger('$$')
            .setId('inlineMath')
            .setLabel('Inline Math')
            .setIcon(<Code size={16} />)
            .setTemplate('$  $'),

        FloatingMenuItem.instance()
        .setTrigger('$$')
            .setId('table')
            .setLabel('Table')
            .setIcon(<Quote size={16} />)
            .setTemplate(`| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`),

        FloatingMenuItem.instance()
        .setTrigger('$$')
            .setId('emoji')
            .setLabel('Emoji')
            .setIcon(<ImageIcon size={16} />)
            .setTemplate('😀 ')
    ];
