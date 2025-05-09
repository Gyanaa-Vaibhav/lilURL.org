import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./features/Auth/Login/components/Login.tsx";
import SignUp from "./features/Auth/SignUp/components/SignUp.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App/>}/>
              <Route path='/home' element={<App/>}/>
              <Route path='/sign-in' element={<Login/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              {/*<Route path='/guest' element={<Guest/>}/>*/}
              {/*<Route path='/chat' element={<MainChat/>}/>*/}
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
