import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import { Markdown } from 'tiptap-markdown';
import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';
import { Eta } from "eta"
import { FloatingMenuItems } from './FloatingMenuItems/FloatingMenuItems';
import { SlashItems } from './FloatingMenuItems/items/SlashItems';
import { AtItems } from './FloatingMenuItems/items/AtItems';
import { DollarItems, DoubleSlashItems, FileItems, AgentItems, TestItems, AWSItems } from './FloatingMenuItems/items';
import { FloatingMenuItem } from './FloatingMenuItems/FloatingMenuItem';
export { FloatingMenuItem } from './FloatingMenuItems/FloatingMenuItem';
import { ParamsModal } from './ParamsModal';
import useAiPromptPanelState from './_state/AiPromptPanelState';
import { Environment } from './types';

export const AiPromptPanel = ({ allMenuItems }: { allMenuItems: FloatingMenuItem[] }) => {
  const aiPromptPanelState = useAiPromptPanelState()
  
  const [editorContent, setEditorContent] = useState(
    localStorage.getItem('editorContent') ||
    `<h1>Untitled</h1><p>Start typing here...</p>`
  );

  useEffect(() => {
    aiPromptPanelState.setAllMenuItems(allMenuItems.map(item => {
        return {
            "id": item.id,
            "label": item.label,
            "trigger": item.trigger,
            "params": item.params,
            "showParamsModal": item.showParamsModal,
        }   
    }))
  }, [])
  

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false, // We'll use the specific CodeBlock extension for more control
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading' && node.attrs.level === 1) {
            return 'Untitled';
          }
          return 'Type \'/\' for commands or just start writing...';
        },
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock.configure({
        languageClassPrefix: 'language-',
        exitOnTripleEnter: false,
        exitOnArrowDown: false,
      }),
      Link.configure({
        openOnClick: false, // We'll handle link opening manually or show a small popup
        autolink: true,
      }),
      Markdown,
      // Consider adding more extensions like:
      // - @tiptap/extension-image for images
      // - @tiptap/extension-task-list for to-do lists
      // - @tiptap/extension-horizontal-rule
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
      localStorage.setItem('editorContent', html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert focus:outline-none p-8 min-h-[calc(100vh-200px)] w-full max-w-4xl mx-auto',
      },
    },
  });

  // State for FloatingMenu keyboard navigation
  const [activeFloatingMenuItemIndex, setActiveFloatingMenuItemIndex] = useState(0);
  const [isFloatingMenuVisible, setIsFloatingMenuVisible] = useState(false);
  const [currentTrigger, setCurrentTrigger] = useState<string>('/');

  // FloatingMenu items for keyboard navigation
  const floatingMenuItems = React.useMemo(() => {
    if (!editor) return [];

    allMenuItems.forEach(item => {
      item.setEditor(editor)
    //   item.setAiPromptPanel(AiPromptPanel)
    })

    const newItems = allMenuItems.filter(item => item.trigger === currentTrigger)
    return newItems.length > 0? newItems : SlashItems
  }, [editor, currentTrigger]);

  const handleFloatingMenuKeyDown = (event: KeyboardEvent) => {
    if (!isFloatingMenuVisible || floatingMenuItems.length === 0) return;

    let handled = false;
    if (event.key === 'ArrowDown') {
      setActiveFloatingMenuItemIndex(prevIndex => (prevIndex + 1) % floatingMenuItems.length);
      handled = true;
    } else if (event.key === 'ArrowUp') {
      setActiveFloatingMenuItemIndex(prevIndex => (prevIndex - 1 + floatingMenuItems.length) % floatingMenuItems.length);
      handled = true;
    } else if (event.key === 'Enter') {
      const activeItem = floatingMenuItems[activeFloatingMenuItemIndex];
      if (activeItem) {
        // aiPromptPanelState.setActiveMenuItem(activeItem);
        
        if (activeItem.deleteTriggerString) {
            if (activeItem.editor.state.selection.from >= activeItem.trigger.length) {
                const sevenCharsBefore = activeItem.editor.state.doc.textBetween(
                    activeItem.editor.state.selection.from - activeItem.trigger.length, 
                    activeItem.editor.state.selection.from, 
                "\n", 
                " "
                );
                if (sevenCharsBefore === activeItem.trigger) {
                    activeItem.editor.commands.deleteRange({ 
                        from: activeItem.editor.state.selection.from - activeItem.trigger.length, 
                        to: activeItem.editor.state.selection.from 
                    });
                }
            }
        }

        const activeMenuInfo = {
            "id": activeItem.id,
            "label": activeItem.label,
            "trigger": activeItem.trigger,
            "params": activeItem.params,
            "showParamsModal": activeItem.showParamsModal,
        }
        // aiPromptPanelState.setActiveMenuInfo(activeMenuInfo)
        // activeItem.action(editor, activeMenuInfo);

        const eta = new Eta()
        const finalTemplate = activeItem.wrapTemplateFunc(activeItem)()
        const testCode = eta.renderString( finalTemplate, activeMenuInfo.params)
        activeItem.editor.chain().focus().insertContent(testCode).run();

        // Delete the trigger character(s)
        if (editor && editor.state.selection.from > 0) {
            let triggerLength = 0;
            let shouldDelete = false;
    
            if (editor.state.selection.from >= activeItem.trigger.length) {
                const charsBefore = editor.state.doc.textBetween(
                    editor.state.selection.from - activeItem.trigger.length, 
                    editor.state.selection.from, 
                    "\n", 
                    " "
                    );
                    if (charsBefore === activeItem.trigger) {
                        triggerLength = activeItem.trigger.length;
                        shouldDelete = true;
                    }
            }
          if (shouldDelete && triggerLength > 0) {
            editor.commands.deleteRange({ 
              from: editor.state.selection.from - triggerLength, 
              to: editor.state.selection.from 
            });
          }
        }
      }
      handled = true;
    } else if (event.key === 'Escape') {
      setIsFloatingMenuVisible(false);
      handled = true;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // FloatingMenu keyboard navigation
  useEffect(() => {
    if (isFloatingMenuVisible) {
      document.addEventListener('keydown', handleFloatingMenuKeyDown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleFloatingMenuKeyDown, true);
    };
  }, [isFloatingMenuVisible, activeFloatingMenuItemIndex, floatingMenuItems, editor]);

  // Reset active index when floating menu becomes visible
  useEffect(() => {
    if (isFloatingMenuVisible) {
      setActiveFloatingMenuItemIndex(0);
    }
  }, [isFloatingMenuVisible]);

  if (!editor) {
    return <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400">Loading Editor...</div>;
  }


  const [isParamsModalOpen, setIsParamsModalOpen] = useState(false);
const [selectedMenuItem, setSelectedMenuItem] = useState<FloatingMenuItem | null>(null);

const openParamsModal = (menuItem: FloatingMenuItem) => {
  setSelectedMenuItem(menuItem);
  setIsParamsModalOpen(true);
};

const handleSaveParams = (updatedParams: Record<string, any>) => {
  if (selectedMenuItem) {
    selectedMenuItem.setParams(updatedParams);
  }
};

  // Tailwind Dark mode toggle example
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      

      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ 
            duration: 100, 
            placement: 'top-end',
            onShow: () => setIsFloatingMenuVisible(true),
            onHide: () => setIsFloatingMenuVisible(false)
          }}
          shouldShow={({ state }) => {
            const { $from } = state.selection;
            // Ensure we are in a paragraph node
            if ($from.parent.type.name !== 'paragraph') {
              return false;
            }
            
            const textContent = $from.parent.textContent;
            const cursorPos = $from.parentOffset;
            


            const triggerStrings = allMenuItems.map(item => item.trigger)

            for (const trigger of triggerStrings) {
              if (cursorPos >= trigger.length) {
                const charsBefore = textContent.substring(cursorPos - trigger.length, cursorPos);
                if (charsBefore === trigger) {
                  setCurrentTrigger(trigger);
                  return true;
                }
              }
            }
            

            
            return false;
          }}
        >
          <div
            style={{
              background: darkMode ? '#374151' : '#f3f4f6',
              border: darkMode ? '1px solid #6b7280' : '1px solid #d1d5db',
              borderRadius: '8px',
              boxShadow: darkMode 
                ? '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
                : '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              padding: '8px',
              minWidth: '240px',
              position: 'relative',
              zIndex: 1000
            }}
          >
            <FloatingMenuItems 
              editor={editor} 
              activeIndex={activeFloatingMenuItemIndex}
              setActiveIndex={setActiveFloatingMenuItemIndex}
              trigger={currentTrigger}
              items={floatingMenuItems}
              
            />
          </div>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />

      <div className="max-w-4xl mx-auto mt-4 p-4 flex justify-center">
        <button
          type="button"
          onClick={() => {
            if (editor) {
              const markdown = editor.storage.markdown.getMarkdown();
              console.log("--- Markdown Output ---");
              console.log(markdown);
              alert('Markdown content logged to console!');
            } else {
              console.error("Editor instance not found.");
              alert('Error: Editor instance not found.');
            }
          }}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          title="Log Markdown to Console"
        >
          Log Markdown to Console
        </button>
      </div>

      <footer className="p-4 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-8">
        Tiptap Notion-like Editor Demo
      </footer>

      {aiPromptPanelState.isParamsModalOpen && <ParamsModal
        isOpen={aiPromptPanelState.isParamsModalOpen}
        onClose={() => aiPromptPanelState.setParamsModalOpen(false)}
        params={selectedMenuItem?.params || {}}
        onSave={handleSaveParams}
        title={`Edit Parameters for ${selectedMenuItem?.label}`}
        /> 
    }
    </div>

  );
};
