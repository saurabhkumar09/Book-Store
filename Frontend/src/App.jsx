import { useEffect, useState} from 'react'
import {  Routes, Route } from 'react-router-dom';
import axios from 'axios'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';

function App() {
  const [Books, setBooks] = useState(0);

  useEffect(()=>{
   axios.get('http://localhost:5000/books/getBooks')
   .then(response => console.log(response.data))
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books/create' element={<CreateBook/>}></Route>
      <Route path='/books/details/:id' element={<ShowBook/>}></Route>
      <Route path='/books/edit/:id' element={<EditBook/>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook/>}></Route>


    </Routes>
    )
}

export default App
