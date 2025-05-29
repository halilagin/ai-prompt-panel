import React from 'react'
import ReactDOM from 'react-dom/client'
import { AiPromptPanel, FloatingMenuItem } from 'ai-prompt-panel'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.css'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// A simple example of how to use AiPromptPanel
const App = () => {
  // Example of how to create a floating menu item
  // You would typically configure this based on your application's needs.
  const myCustomItem = FloatingMenuItem.instance()
    .setLabel('My Custom Action')
    .setIcon(<span>🚀</span>) // Replace with an actual icon component if you use them
    .setTrigger('@custom') // The string that triggers this item
    .setTemplate('Template with a {{variable}}.') // The template to insert
    .setParams({ variable: 'default value for variable' }) // Default parameters for the template
    .setShowParamsModal(true); // Set to true if you want a modal to edit params

  // AiPromptPanel expects an `allMenuItems` prop.
  // For this example, we'll pass our custom item.
  // If AiPromptPanel doesn't have built-in default items, you might want to add them here too.
  const itemsForPanel = [myCustomItem];

  const demoCodeString = `
import { AiPromptPanel, FloatingMenuItem } from 'ai-prompt-panel'

const myCustomItem = FloatingMenuItem.instance()
  .setLabel('My Custom Action')
  .setIcon(<span>🚀</span>)
  .setTrigger('@custom')
  .setTemplate('Template with a {{variable}}.')
  .setParams({ variable: 'default value for variable' })
  .setShowParamsModal(true);

const itemsForPanel = [myCustomItem];

// ...rest of your app code
<AiPromptPanel
  allMenuItems={itemsForPanel}
  // ... other props
/>
  `;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AiPromptPanel Open Source Demo</h1>
      <p>This page demonstrates the <code>AiPromptPanel</code> component. Try typing '@' or '/' in the input field below.</p>
      <p>You can also type '@custom' to trigger the example custom floating menu item.</p>

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <h2>Demo Code:</h2>
        <SyntaxHighlighter language="tsx" style={atomDark} customStyle={{ borderRadius: '8px', padding: '15px' }}>
          {demoCodeString}
        </SyntaxHighlighter>
      </div>
      
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginTop: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <AiPromptPanel
          allMenuItems={itemsForPanel} // Pass the required allMenuItems prop
          // `initialContent` and `placeholder` are handled internally by AiPromptPanel
          // onContentChange={(content, textContent) => console.log('HTML Content:', content, 'Text:', textContent)}
          // onSave={(content) => alert('Content saved (check console):\n' + content)}
        />
      </div>

      <div style={{ marginTop: '30px', fontSize: '0.9em', color: '#555' }}>
        <p><strong>Note:</strong> The functionality of custom items (like '@custom') and other features like slash commands depends on how <code>AiPromptPanel</code> is implemented to handle them. This example provides a basic setup.</p>
        <p>Check the console for outputs from <code>onContentChange</code> or <code>onSave</code> if you uncomment and implement them in AiPromptPanel.</p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
