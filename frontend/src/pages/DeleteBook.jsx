/* eslint-disable no-unused-vars */

import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

const duration =  5000;

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })

      .catch((err) => {
        setLoading(false);
        alert("an error happeneed please check the console");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton /> 
      <div className='flex flex-col text-center'>
      <h1 className="text-3xl my-4">Delete book</h1>
      {loading ? 
       <Spinner duration={duration} />
       : ""}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure to delete this book !</h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full"
            onClick={handleDelete}
          >
            yes delete !
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
