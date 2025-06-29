import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './Layouts/Main'
import Events from './Pages/Events';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  

    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Main></Main>} />
       <Route path="events" element={<Events></Events>} />
       
       

    
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
