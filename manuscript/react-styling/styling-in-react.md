# Styling in React

There are many ways to style a React application, and there are lengthy debates about the best **styling strategy** and **styling approach**. We'll go over a few of these strategies each representing one approach without giving them too much weight. There will be some pro and con arguments, but it's mostly a matter of what fits best for developers and their teams.

We will begin React styling with common CSS in React, but then explore two alternatives for more advanced **CSS-in-CSS** (with **CSS Modules**) and **CSS-in-JS** (with s**Styled Components**) strategies. CSS Modules and Styled Components are only two approaches out of many in both groups of strategies. We'll also cover how to include scalable vector graphics (SVGs), such as a logo or icons, in our React application.

![](images/css-style-strategies.png)

If you don't want to build common UI components (e.g. button, dialog, dropdown) from scratch, you can always pick a [popular UI library suited for React](https://www.robinwieruch.de/react-libraries/), which provides these components by default. However, it is better for learning React if you try building these components before using a pre-built solution. As a result, we won't use any of the UI component libraries.

![](images/ui-library.png)

The following styling approaches and SVGs are mostly pre-configured in Vite. If you're in control of the build tools (e.g. Webpack) by having a custom setup, they might need to be configured to enable importing CSS or SVG files. Since we are using Vite, we can use these files right away. For example, in your *src/main.jsx* file, make sure to import the *src/index.css* file:

{title="src/main.jsx",lang="javascript"}
~~~~~~~
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
# leanpub-start-insert
import './index.css';
# leanpub-end-insert
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
~~~~~~~

Use the following CSS in the *src/index.css* file for removing the margin and for using a standardized font with fallbacks:

{title="src/index.css",lang="css"}
~~~~~~~
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
~~~~~~~

Essentially you can declare all the CSS that should apply globally for your project in this file.

### Exercises:

* Compare your source code against the author's [source code](https://tinyurl.com/38kw8tkn).
  * Recap all the [source code changes](https://tinyurl.com/mr2fc836) from this section.
* Read more about [the different styling strategies and approaches in React](https://www.robinwieruch.de/react-css-styling/).

