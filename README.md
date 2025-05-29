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

## Demo Video

Watch this quick demonstration of the project in action:

<p align="center">
  <video src="https://private-user-images.githubusercontent.com/545826/448849310-340387cd-a520-4dec-bcd5-c426ad0022a0.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDg1MjU4NTksIm5iZiI6MTc0ODUyNTU1OSwicGF0aCI6Ii81NDU4MjYvNDQ4ODQ5MzEwLTM0MDM4N2NkLWE1MjAtNGRlYy1iY2Q1LWM0MjZhZDAwMjJhMC5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTI5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyOVQxMzMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00YTE3Yzg3ZWJmYTIwYjFiNjliZTlhZDNhZWEzMWFiYmQ3OTZkMjA3ZjUxNmE1YmI2MWJiMDVlY2I3Njc1NjEzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.TmOx4u1c2LNr6jf9S8TSFuni1TS1D_pagak65UXTTbI" width="80%" controls muted loop autoplay>
     Your browser does not support the video tag. You can <a href="https://private-user-images.githubusercontent.com/545826/448849310-340387cd-a520-4dec-bcd5-c426ad0022a0.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDg1MjU4NTksIm5iZiI6MTc0ODUyNTU1OSwicGF0aCI6Ii81NDU4MjYvNDQ4ODQ5MzEwLTM0MDM4N2NkLWE1MjAtNGRlYy1iY2Q1LWM0MjZhZDAwMjJhMC5tcDQ_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTI5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyOVQxMzMyMzlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00YTE3Yzg3ZWJmYTIwYjFiNjliZTlhZDNhZWEzMWFiYmQ3OTZkMjA3ZjUxNmE1YmI2MWJiMDVlY2I3Njc1NjEzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.TmOx4u1c2LNr6jf9S8TSFuni1TS1D_pagak65UXTTbI">watch the video here</a>.
  </video>
</p>

## Live Demo / Sandbox

You can try out a live demo of this project directly in your browser using CodeSandbox:

<a href="https://codesandbox.io/p/github/halilagin/ai-prompt-panel/draft/angry-snow?embed=1" target="_blank">
  <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit on CodeSandbox" />
</a>

Or, for a direct embed (though GitHub's CSP might sometimes restrict this):

<iframe
   src="https://codesandbox.io/p/github/halilagin/ai-prompt-panel/draft/angry-snow?embed=1&theme=dark"
   style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
   title="ai-prompt-panel"
   allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
   sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
 ></iframe>

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
