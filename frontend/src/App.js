import './App.css'
import NavBar from './components/common/NavBar'
import Home from './components/external/Home'
import About from './components/external/About'
import Projects from './components/external/Projects'
import Contact from './components/external/Contact'
import Login from './components/internal/Login'
import HomeInternal from './components/internal/HomeInternal'
import { Footer } from './components/common/Footer'
import ProjectEditor from './components/internal/ProjectEditor'
import ProjectForm from './components/internal/ProjectForm'
import BlogEditor from './components/internal/BlogEditor'
import Blog from './components/external/Blog'
import BlogForm from './components/internal/BlogForm'
import BlogPost from './components/external/BlogPost'
import ChangePass from './components/internal/ChangePass'
import Private from './components/common/Private'
import { AuthContext } from './components/contexts/AuthContext'
import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App () {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      <AuthContext.Provider value={{ isLogged, setIsLogged }}>
        <BrowserRouter>
          <NavBar style={{ position: 'relative' }} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/post/:id' element={<BlogPost />} />
            <Route
              path='/internal/blogeditor' element={
                <Private isLogged={isLogged}>
                  <BlogEditor />
                </Private>
}
            />
            <Route
              path='/internal/blogeditor/add' element={
                <Private isLogged={isLogged}>
                  <BlogForm type='ADD' />
                </Private>
            }
            />
            <Route
              path='/internal/blogEditor/edit/:id' element={
                <Private isLogged={isLogged}>
                  <BlogForm type='EDIT' />
                </Private>
            }
            />
            <Route
              path='/internal/changepassword' element={
                <Private isLogged={isLogged}>
                  <ChangePass />
                </Private>
            }
            />
            <Route
              path='/internal/projectEditor' element={
                <Private isLogged={isLogged}>
                  <ProjectEditor />
                </Private>
            }
            />
            <Route
              path='/internal/projectEditor/add' element={
                <Private isLogged={isLogged}>
                  <ProjectForm type='ADD' />
                </Private>
            }
            />
            <Route
              path='/internal/projectEditor/edit/:id' element={
                <Private isLogged={isLogged}>
                  <ProjectForm type='EDIT' />
                </Private>
            }
            />
            <Route
              path='/internal' element={
                <Private isLogged={isLogged}>
                  <HomeInternal />
                </Private>
            }
            />
          </Routes>
          <Footer style={{ position: 'relative' }} />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  )
}

export default App
