import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';
import { useEditor, EditorContent, FloatingMenu,  BubbleMenu } from '@tiptap/react';

import { useCallback, useMemo } from 'react';

// Helper component for menu buttons
const MenuButton = ({ icon, onClick, isActive, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
  >
    {icon}
  </button>
);

const TipTapEditorToolbar = ({editor}) => { 

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
    
        // cancelled
        if (url === null) {
          return;
        }
    
        // empty
        if (url === '') {
          editor.chain().focus().extendMarkRange('link').unsetLink().run();
          return;
        }
    
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }, [editor]);

      // Define the toolbar items using useMemo
const toolbarItems = useMemo(() => {
  if (!editor) {
    return [];
  }
  
  return [
    { type: 'button', id: 'bold', icon: <Bold size={18} />, onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), title: "Bold (Ctrl+B)" },
    { type: 'button', id: 'italic', icon: <Italic size={18} />, onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), title: "Italic (Ctrl+I)" },
    { type: 'button', id: 'strike', icon: <Strikethrough size={18} />, onClick: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), title: "Strikethrough" },
    { type: 'button', id: 'code', icon: <Code size={18} />, onClick: () => editor.chain().focus().toggleCode().run(), isActive: editor.isActive('code'), title: "Code" },
    { type: 'separator', id: 'sep1' },
    { type: 'button', id: 'h1', icon: <Heading1 size={18} />, onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), title: "Heading 1" },
    { type: 'button', id: 'h2', icon: <Heading2 size={18} />, onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), title: "Heading 2" },
    { type: 'button', id: 'h3', icon: <Heading3 size={18} />, onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }), title: "Heading 3" },
    { type: 'button', id: 'paragraph', icon: <Pilcrow size={18} />, onClick: () => editor.chain().focus().setParagraph().run(), isActive: editor.isActive('paragraph'), title: "Paragraph" },
    { type: 'separator', id: 'sep2' },
    { type: 'button', id: 'bulletList', icon: <List size={18} />, onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), title: "Bullet List" },
    { type: 'button', id: 'orderedList', icon: <ListOrdered size={18} />, onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), title: "Ordered List" },
    { type: 'button', id: 'blockquote', icon: <Quote size={18} />, onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), title: "Blockquote" },
    { type: 'button', id: 'codeBlock', icon: <Code size={18} />, onClick: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock'), title: "Code Block" },
    { type: 'button', id: 'link', icon: <LinkIcon size={18} />, onClick: setLink, isActive: editor.isActive('link'), title: "Add Link" },
  ];
}, [editor, setLink]);

      return (<div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="max-w-4xl mx-auto flex items-center space-x-1">
          {/* Render toolbar items by mapping over the array */}
          {toolbarItems.map(item => {
            if (item.type === 'separator') {
              return <span key={item.id} className="border-l h-6 border-gray-300 dark:border-gray-600 mx-2"></span>;
            }
            const buttonItem = item as { type: 'button', id: string, icon: JSX.Element, onClick: () => void, isActive: boolean, title: string };
            return (
              <MenuButton   
                key={buttonItem.id}
                icon={buttonItem.icon}
                onClick={buttonItem.onClick}
                isActive={buttonItem.isActive}
                title={buttonItem.title}
              />
            );
          })}
          {/* Add more buttons: HorizontalRule, Image, etc. */}
        </div>
      </div>)
}