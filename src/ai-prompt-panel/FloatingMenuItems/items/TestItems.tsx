import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';
import { Eta } from "eta"
import { FloatingMenuItem } from '../FloatingMenuItem';
import useAiPromptPanelState from '../../_state/AiPromptPanelState';


export const TestItems = 
    [
        FloatingMenuItem.instance()
            .setId('etaTest')
            .setTrigger('test://')
            .setLabel('Eta Test')
            .setIcon(<Code size={16} />)
            .setParams({'name':'Ben'})
            .setDeleteTriggerString(true)
            .setTemplate('Hello <%= it.name %>')
            .setShouldWrapTemplate(true),
        FloatingMenuItem.instance()
            .setId('unitTest')
            .setTrigger('test://')
            .setLabel('Unit Test')
            .setIcon(<Code size={16} />)
            .setTemplate(`\`\`\`javascript
describe('Test Suite', () => {
  it('should pass this test', () => {
    expect(true).toBe(true);
  });
});
\`\`\``),

        FloatingMenuItem.instance()
            .setId('testCase')
            .setTrigger('test://')
            .setLabel('Test Case')
            .setIcon(<List size={16} />)
            .setTemplate(`**Test Case:** 
- **Input:** Sample input
- **Expected Output:** Expected result
- **Actual Output:** Actual result
- **Status:** ✅ Pass / ❌ Fail`),

        FloatingMenuItem.instance()
            .setId('testReport')
            .setTrigger('test://')
            .setLabel('Test Report')
            .setIcon(<ImageIcon size={16} />)
            .setTemplate(`## Test Report
**Date:** ${new Date().toLocaleDateString()}
**Total Tests:** 0
**Passed:** 0
**Failed:** 0
**Coverage:** 0%`)
    ];
