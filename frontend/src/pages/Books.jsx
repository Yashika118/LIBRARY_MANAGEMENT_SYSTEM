import React, { useEffect } from 'react'
import { useBookStore } from '../store/useBookStore';
import Card from '../components/Card';

const Books = () => {
    const {books,getBooks,isLoading,error}=useBookStore();

    useEffect(()=>{
        getBooks();
    },[getBooks]);

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
        {/* <h1 className="text-2xl font-bold text-black text-center mb-6">Book List</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book)=>(
                <Card key={book._id} book={book}/>
            ))}
        </div>

    </div>
  )
}

export default Books