import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Login from "./features/Auth/Login/components/Login.tsx";
import SignUp from "./features/Auth/SignUp/components/SignUp.tsx";
import Analytics from "./features/Analytics/components/Analytics.tsx";
import {MainDashboard} from "./features/Analytics/components/MainDashboard.tsx";
import { UpdateQR } from './features/UpdateQR/components/UpdateQR.tsx';
import PrivacyPolicy from './features/Legal/components/PrivacyPolicy.tsx';
import CodeOfConduct from './features/Legal/components/CodeOfConduct.tsx';
import TermsOfService from './features/Legal/components/TermsOfService.tsx';
import {Profile} from "./features/Profile/components/Profile.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<App/>}/>
              <Route path='/home' element={<App/>}/>
              <Route path='/sign-in' element={<Login/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              <Route path='/analytics' element={<Analytics/>}/>
              <Route path='/dashboard' element={<MainDashboard/>}/>
              <Route path='/updateQR' element={<UpdateQR />}/>
              {/*<Route path='/create-link' element={<CreateLink />}/>*/}
              <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
                <Route path='/code-of-conduct' element={<CodeOfConduct />}/>
                <Route path='/terms-of-service' element={<TermsOfService />}/>
                <Route path='/profile' element={<Profile />}/>
              {/*<Route path='/chat' element={<MainChat/>}/>*/}
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
