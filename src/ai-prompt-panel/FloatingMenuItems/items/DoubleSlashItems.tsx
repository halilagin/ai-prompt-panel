import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const DoubleSlashItems =  [
        FloatingMenuItem.instance()
            .setTrigger('//')
            .setId('comment')
            .setLabel('Comment')
            .setIcon(<Quote size={16} />)
            .setTemplate('<!-- Comment here -->'),

        FloatingMenuItem.instance()
            .setTrigger('//')
            .setId('divider')
            .setLabel('Divider')
            .setIcon(<Minus size={16} />)
            .setTemplate('---'),

        FloatingMenuItem.instance()
            .setTrigger('//')
            .setId('pageBreak')
            .setLabel('Page Break')
            .setIcon(<Minus size={16} />)
            .setTemplate('\n\n---\n\n'),

        FloatingMenuItem.instance()
            .setTrigger('//')
            .setId('todo')
            .setLabel('Todo List')
            .setIcon(<List size={16} />)
            .setTemplate('- [ ] Todo item\n- [ ] Another item'),

        FloatingMenuItem.instance()
            .setTrigger('//')
            .setId('date')
            .setLabel('Insert Date')
            .setIcon(<Pilcrow size={16} />)
            .setTemplate(`${new Date().toLocaleDateString()} `)
    ];
