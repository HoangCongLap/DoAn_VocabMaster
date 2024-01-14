import './index.css';
import { App } from '~/components/root/App';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element | DocumentFragment);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
