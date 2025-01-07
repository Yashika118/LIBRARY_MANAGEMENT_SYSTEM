import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useBookStore } from '../store/useBookStore.js';

const BookDetailsPage = () => {
    const {id}=useParams();
    const {bookDetails,viewBook,setCurrentBookId,isLoading,error}=useBookStore();

    useEffect(()=>{
        setCurrentBookId(id);
        viewBook();
    },[id,viewBook,setCurrentBookId]);

    console.log(bookDetails);
  return (
    <div className='flex flex-row mt-20'>
        <div>left</div>
        <div>right</div>

    </div>
  )
}

export default BookDetailsPage