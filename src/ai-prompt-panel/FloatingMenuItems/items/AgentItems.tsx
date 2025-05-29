import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const AgentItems = 
    [
        FloatingMenuItem.instance()
            .setId('createAgent')
            .setTrigger('agent://')
            .setLabel('Create Agent')
            .setIcon(<Bold size={16} />)
            .setTemplate('🤖 **Agent Created:** MyAgent'),

        FloatingMenuItem.instance()
            .setId('agentConfig')
            .setTrigger('agent://')
            .setLabel('Agent Configuration')
            .setIcon(<Code size={16} />)
            .setTemplate(`\`\`\`yaml
name: "AI Agent"
model: "gpt-4"
temperature: 0.7
max_tokens: 1000
\`\`\``),

        FloatingMenuItem.instance()
            .setId('agentPrompt')
            .setTrigger('agent://')
            .setLabel('Agent Prompt')
            .setIcon(<Quote size={16} />)
            .setTemplate('> **System Prompt:** You are a helpful AI assistant. Please respond accurately and helpfully to user queries.')
    ];
