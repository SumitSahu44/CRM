import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SidebarProvider from './context/SidebarContext';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</SidebarProvider>
);




