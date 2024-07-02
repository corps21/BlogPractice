import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Home, SignIn, SignUp, AddPost, AllPosts, EditPost} from "./pages/index.js"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

import store from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/add-post' element={<AddPost/>}/>
      <Route path='/all-post' element={<AllPosts/>} />
      <Route path='/edit-post' element={<EditPost/>} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />    
    </Provider>  
  </React.StrictMode>,
)
