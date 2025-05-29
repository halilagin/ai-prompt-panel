# AI Prompt Panel

[![NPM version](https://img.shields.io/npm/v/ai-prompt-panel.svg?style=flat)](https://www.npmjs.com/package/ai-prompt-panel) <!-- Replace with your actual npm link once published -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and feature-rich AI prompt panel component for React, built with Tiptap.

## Features

- Rich text editing capabilities powered by Tiptap.
- Customizable floating menu items triggered by special characters (e.g., '@', '/').
- Parameterized templates for dynamic content insertion.
- Modal support for editing template parameters.
- Easy integration into React applications.

## Installation

```bash
npm install ai-prompt-panel
# or
yarn add ai-prompt-panel
```

## Usage

Here's a basic example of how to use `AiPromptPanel` in your React application:

```tsx
import React from 'react';
import { AiPromptPanel, FloatingMenuItem } from 'ai-prompt-panel';
// If your AiPromptPanel has a separate stylesheet you need to import (check component documentation):
// import 'ai-prompt-panel/dist/style.css';

const App = () => {
  // Create custom floating menu items
  const myActionItem = FloatingMenuItem.instance()
    .setLabel('My Action')
    .setIcon(<span>🚀</span>) // Use your preferred icon component or string
    .setTrigger('@myaction')
    .setTemplate('Executing my action with {{param1}}!')
    .setParams({ param1: 'default value' })
    .setShowParamsModal(true);

  const anotherItem = FloatingMenuItem.instance()
    .setLabel('Slash Command')
    .setTrigger('/') // Note: AiPromptPanel might have default slash items
    .setTemplate('Running slash command: {{commandName}}')
    .setParams({ commandName: 'help' });

  const allMyMenuItems = [myActionItem, anotherItem];

  return (
    <div>
      <AiPromptPanel
        allMenuItems={allMyMenuItems}
        // Add any other props your AiPromptPanel might expose, for example:
        // onContentChange={(htmlContent, textContent) => {
        //   console.log("HTML:", htmlContent);
        //   console.log("Text:", textContent);
        // }}
        // onSave={(htmlContent) => {
        //   console.log("Content to save:", htmlContent);
        // }}
      />
    </div>
  );
};

export default App;
```

### Key Props

-   `allMenuItems` (required): An array of `FloatingMenuItem` instances that define the available actions and templates in the panel.

### Creating Floating Menu Items

Use the `FloatingMenuItem.instance()` builder to create and configure items:

```typescript
import { FloatingMenuItem } from 'ai-prompt-panel';

const item = FloatingMenuItem.instance()
  .setId('unique-id') // Optional: auto-generated if not set
  .setLabel('Item Label')
  .setIcon(<span>✨</span>) // JSX element for the icon
  .setTrigger('@') // Character(s) that activate this item in the floating menu
  .setTemplate('Your template string with {{variables}}.')
  .setParams({ variable: 'defaultValue' }) // Default values for template variables
  .setShowParamsModal(true) // Whether to show a modal for editing params (default: false)
  .setDeleteTriggerString(true) // Whether to delete the trigger string upon insertion (default: true)
  // You can also customize the template wrapping behavior if needed
  // .setShouldWrapTemplate(true)
  // .wrapTemplate((activeMenuItem) => () => `<strong>${activeMenuItem.template}</strong>`)
  ;
```

## Running the Demo

To see the `AiPromptPanel` in action with a sample configuration, you can run the demo included in this repository:

1.  Clone the repository (if you haven't already).
2.  Install dependencies: `npm install`
3.  Start the demo app: `npm run dev`

This will open the example application in your browser (usually at `http://localhost:3001`). The code for the demo can be found in `example_app_src/main.tsx`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for bugs, features, or improvements.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Remember to replace placeholder URLs (like the NPM badge) and review all sections for accuracy before publishing.* # ai-prompt-panel
