import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Blog from './assets/pages/Blog'
import Layout from './assets/pages/admin/Layout'
import Dashboard from './assets/pages/admin/Dashboard'
import AddBlog from './assets/pages/admin/AddBlog'
import ListBlog from './assets/pages/admin/ListBlog'
import Comments from './assets/pages/admin/Comments'
import Login from './assets/components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token} = useAppContext()


  return (
    <div>
      <Toaster/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/blog/:id' element={<Blog/>} />
      <Route path='/admin' element={token ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
      </Route>
     </Routes>
    </div>
  )
}

export default App
