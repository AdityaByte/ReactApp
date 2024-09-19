import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// We can do the upper thing in this way also 

// const root = createRoot(document.getElementById('root'))
// root.render(
//   <App />
// )