import React from 'react'
import { Container } from '@chakra-ui/react'
import { Routes,Route,Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from "recoil";
import userAtom from '../atom/userAtom'
import LogoutButton from './components/LogoutButton'
import UpdateProfile from './pages/UpdateProfile'
import CreatePost from './components/CreatePost'
const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    
    <Container maxW='620px'>
      <Header/>
     <Routes>
     <Route path='/' element={user ? <HomePage /> : <Navigate to='/auth' />} />
     <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to='/' />} />
     <Route path='/update' element={user ? <UpdateProfile /> : <Navigate to='/auth' />} />
      <Route path="/:username" element={<UserPage/>}/>
      <Route path="/:username/post/:pid" element={<PostPage likes={33} replies={45}/>}/>
     </Routes>
     {user && <LogoutButton/>}
     {user && <CreatePost/>}
     </Container>
  )
}

export default App
