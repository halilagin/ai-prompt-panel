


const DemoCodeText = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AiPromptPanel, FloatingMenuItem } from 'ai-prompt-panel'
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

  const itemsForPanel = [myCustomItem];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>AiPromptPanel Open Source Demo</h1>
      <p>This page demonstrates the <code>AiPromptPanel</code> component. Try typing '@' or '/' in the input field below.</p>
      <p>You can also type '@custom' to trigger the example custom floating menu item.</p>
      
      <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '15px', marginTop: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <AiPromptPanel
          allMenuItems={itemsForPanel} // Pass the required allMenuItems prop
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

`