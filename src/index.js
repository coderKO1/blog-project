import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const rootElement = document.getElementById('root');
console.log('Root Element:', rootElement); // Debug log
if (!rootElement) {
  console.error('Root element not found. Check your index.html for <div id="root">');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}