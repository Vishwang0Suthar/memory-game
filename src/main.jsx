import React from 'react'
import ReactDOM from 'react-dom/client' //library used for browser interface
//react native can be used for mobile app developement as well as for the desktop application
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,//all the react tags are called components
)
