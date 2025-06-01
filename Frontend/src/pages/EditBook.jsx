import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar} = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5000/books/getbooks/${id}`)
      .then((res) => {
        setAuthor(res.data.data.author)
        setPublisher(res.data.data.publisher)
        setTitle(res.data.data.title)
        setLoading(false)
      }).catch((err) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(err);
      });
  }, [id])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publisher
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/update/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully',{variant:'success'})
        navigate('/')
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Error',{variant:'error'})
        console.log(err);
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          ></input>
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          ></input>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publisher}
            onChange={(e) => { setPublisher(e.target.value) }}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          ></input>
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>


    </div>
  )
}

export default EditBook