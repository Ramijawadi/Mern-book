/* eslint-disable no-unused-vars */


import React from 'react';
import {useState , useEffect} from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import {AiOutlinedEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox , MdOutlinedDelete} from 'react-icons/md';
import Spinner from '../components/Spinner';


const Home = () => {

    const [books , setBooks]= useState([]);
    const [loading , setLoading] = useState(false);


    useEffect(() => {
  setLoading(true);

  axios.get('http://localhost:4000/books')
  .then((response) => {
setBooks(response.response.data);
setLoading(false);

  })
  .catch((error) => {
console.log(error)
setLoading(false)

  })

    },[])
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>

        <h1>  


            
        </h1>
      </div>
    </div>
  );
}

export default Home;
