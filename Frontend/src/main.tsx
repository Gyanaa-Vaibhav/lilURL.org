import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./features/Login/components/Login.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App/>}/>
              <Route path='/home' element={<App/>}/>
              <Route path='/login' element={<Login/>}/>
              {/*<Route path='/register' element={<Register/>}/>*/}
              {/*<Route path='/guest' element={<Guest/>}/>*/}
              {/*<Route path='/chat' element={<MainChat/>}/>*/}
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
