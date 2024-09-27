import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StudentContextProvider } from './context/student-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StudentContextProvider>
        <App />
    </StudentContextProvider>
)
