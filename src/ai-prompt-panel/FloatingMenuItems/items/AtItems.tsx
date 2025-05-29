import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const AtItems = 
    [
        FloatingMenuItem.instance()
            
            .setTrigger("@")
            .setId('bold')
            .setLabel('Bold Text')
            .setIcon(<Bold size={16} />)
            .setTemplate('<a href="Bold Text">Bold Text</a>'),

        FloatingMenuItem.instance()
            .setTrigger('@')
            .setId('italic')
            .setLabel('Italic Text')
            .setIcon(<Italic size={16} />)
            .setTemplate('<a href="Italic Text">Italic Text</a>'),

        FloatingMenuItem.instance()
                .setTrigger('@')
            
            .setId('strikethrough')
            .setLabel('Strikethrough')
            .setIcon(<Strikethrough size={16} />)
            .setTemplate('<a href="Strikethrough">Strikethrough</a>'),

        FloatingMenuItem.instance()
            .setTrigger('@')
            .setId('code')
            .setLabel('Inline Code')
            .setIcon(<Code size={16} />)
            .setTemplate('<a href="Inline Code">Inline Code</a>'),

        FloatingMenuItem.instance()
            .setTrigger('@')
            .setId('link')
            .setLabel('Insert Link')
            .setIcon(<LinkIcon size={16} />)
            .setTemplate('<a href="Insert Link">Insert Link</a>')
    ];

