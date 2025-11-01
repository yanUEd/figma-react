import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App.tsx'
import { StyleProvider } from '@figma-react/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider>
      <App />
    </StyleProvider>
  </React.StrictMode>,
)
