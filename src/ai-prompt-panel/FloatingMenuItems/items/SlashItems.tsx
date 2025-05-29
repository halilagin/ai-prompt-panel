import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';
import { FloatingMenuItem } from '../FloatingMenuItem';

export const SlashItems =[
        FloatingMenuItem.instance()
            
            .setTrigger('/')
            .setId('paragraph')
            .setLabel('Paragraph')
            .setIcon(<Pilcrow size={16} />)
            .setTemplate(''),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('heading1')
            .setLabel('Heading 1')
            .setIcon(<Heading1 size={16} />)
            .setTemplate('# '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('heading2')
            .setLabel('Heading 2')
            .setIcon(<Heading2 size={16} />)
            .setTemplate('## '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('heading3')
            .setLabel('Heading 3')
            .setIcon(<Heading3 size={16} />)
            .setTemplate('### '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('bulletList')
            .setLabel('Bullet List')
            .setIcon(<List size={16} />)
            .setTemplate('- '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('orderedList')
            .setLabel('Numbered List')
            .setIcon(<ListOrdered size={16} />)
            .setTemplate('1. '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('codeBlock')
            .setLabel('Code Block')
            .setIcon(<Code size={16} />)
            .setTemplate('```\n\n```'),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('blockquote')
            .setLabel('Blockquote')
            .setIcon(<Quote size={16} />)
            .setTemplate('> '),

        FloatingMenuItem.instance()
            .setTrigger('/')
            .setId('horizontalRule')
            .setLabel('Horizontal Rule')
            .setIcon(<Minus size={16} />)
            .setTemplate('---')
    ];

