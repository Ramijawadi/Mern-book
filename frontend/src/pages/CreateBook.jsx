/* eslint-disable no-unused-vars */

import React from 'react';
import {useState} from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';

import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
const CreateBook = () => {
const [title , setTitle] = useState("");
const [author , setAuthor] = useState("");
const [publishYear , setPublishYear] = useState("");
const [loading , setLoading] = useState(false);
const navigate = useNavigate();
const duration =  5000;
const handleSaveBook = () => {

  
const data = {

  title , author, publishYear,
};
setLoading(true);
 axios.post('http://localhost:4000/books/',data)
 .then (() => {
  setLoading(false),
  navigate('/');
 }).catch((error) => {
  
  setLoading(false)
  alert('error happened , please check the console');
  console.log(error)
 })


}
return (
  <div className='p-4'>
    <BackButton />
    <div className='flex flex-col text-center'>
    <h1 className='text-3xl my-4'>Create Book</h1>
    {loading ? <Spinner  duration={duration} /> : ''}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input
          type='number'
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2  w-full '
        />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
        Save
      </button>
    </div>
  </div>
  </div>
)
}

export default CreateBook;
