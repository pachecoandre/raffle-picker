import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles.css';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode as HTMLElement);
root.render(<App />);
