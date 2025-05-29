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

import { AWSItems, TestItems, AgentItems, SlashItems, FileItems, DoubleSlashItems, DollarItems, AtItems } from './items';


export const FloatingMenuItems = ({ editor, activeIndex, setActiveIndex,  trigger, items }) => {
    if (!editor) return null;

const handleItemClick = (itemAction) => {
    itemAction(); // Execute the Tiptap command

    // Attempt to delete the trigger character(s)
    // Check if selection and 'from' are valid before attempting to delete
    if (editor.state.selection.from > 0) {
        // Determine trigger length based on current trigger
        let triggerLength = 0;
        let shouldDelete = false;

        if (editor.state.selection.from >= trigger.length) {
            const charsBefore = editor.state.doc.textBetween(
                editor.state.selection.from - trigger.length, 
                editor.state.selection.from, 
                "\n", 
                " "
                );
                if (charsBefore === trigger) {
                    triggerLength = trigger.length;
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
};


// Custom styles with enhanced contrast
const olStyles: React.CSSProperties = {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    zIndex: 1
  };

  const liStyles: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: 'none',
    outline: 'none',
    textAlign: 'left',
    borderRadius: '8px',
    margin: '2px 0'
  };

  const liHoverStyles: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  };

  const liActiveStyles: React.CSSProperties = {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  };

  const iconContainerStyles: React.CSSProperties = {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    transition: 'all 0.2s ease-in-out'
  };

  const activeIconContainerStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  };

  const labelStyles: React.CSSProperties = {
    flex: 1,
    fontWeight: '500'
  };

  return (
    <ol style={olStyles}>
      {items.map((item, index) => (
        <li
          key={item.id}
          onClick={() => handleItemClick(item.action)}
          style={{
            ...liStyles,
            ...(index === activeIndex ? liActiveStyles : {})
          }}
          role="menuitem"
          tabIndex={-1}
          onMouseEnter={(e) => {
            if (index !== activeIndex) {
              Object.assign(e.currentTarget.style, liHoverStyles);
              const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
              if (iconContainer) {
                Object.assign(iconContainer.style, activeIconContainerStyles);
              }
            }
            setActiveIndex(index);
          }}
          onMouseLeave={(e) => {
            if (index !== activeIndex) {
              Object.assign(e.currentTarget.style, liStyles);
              const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
              if (iconContainer) {
                Object.assign(iconContainer.style, iconContainerStyles);
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick(item.action);
            }
          }}
        >
          <span 
            className="icon-container"
            style={{
              ...iconContainerStyles,
              ...(index === activeIndex ? activeIconContainerStyles : {})
            }}
          >
            {item.icon}
          </span>
          <span style={labelStyles}>{item.label}</span>
          
        </li>
      ))}
    </ol>
  );
};
  