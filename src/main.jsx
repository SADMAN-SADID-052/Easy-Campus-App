import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './Layouts/Main'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  

    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Main></Main>} />
       
       

    
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
