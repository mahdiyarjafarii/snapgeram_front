import { Route, Routes } from 'react-router-dom';
import './globals.css';
import RootLayout from './root/RootLayout';

import AuthLayout from './auth/AuthLayout';
import SignupForm from './auth/forms/SignupForm';
import SigninForm from './auth/forms/SigninForm';
import { Toaster } from "@/components/ui/toaster"
import {
    Home,
    Explore,
    Saved,
    CreatePost,
    Profile,
    EditPost,
    PostDetails,
    UpdateProfile,
    AllUsers,
  } from "./root/pages/index";






const App = () => {
  return (
 <main className='flex h-screen'>
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm/>}/>
            <Route path='/sign-up' element={<SignupForm/>}/>
        </Route>


        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>


    </Routes>
    <Toaster/>

 </main>
  )
}

export default App