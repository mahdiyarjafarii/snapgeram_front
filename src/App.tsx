import { Route, Routes } from 'react-router-dom';
import './globals.css';
import RootLayout from './root/RootLayout';
import Home from './root/pages/Home';
import AuthLayout from './auth/AuthLayout';
import SignupForm from './auth/forms/SignupForm';
import SigninForm from './auth/forms/SigninForm';
import { Toaster } from "@/components/ui/toaster"






const App = () => {
  return (
 <main className='flex h-screen'>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>}/>
            <Route path='/sign-up' element={<SignupForm/>}/>
        </Route>


        <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>    
        </Route>

    </Routes>
    <Toaster/>

 </main>
  )
}

export default App