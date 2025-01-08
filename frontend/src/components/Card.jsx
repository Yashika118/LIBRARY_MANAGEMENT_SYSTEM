import React from 'react'
import PlaceholderBook from "../../public/images/placeholder_book2.jpg"
import { Link } from 'react-router-dom'

const Card = (props) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src={props.book.bookImage || PlaceholderBook}
                    alt={props.book.title || "Book Cover"}
                    className="rounded-xl h-52 object-cover w-full" />
            </figure>
            <div className="card-body text-left">
                <h2 className="card-title ">{props.book.title}</h2>
                <p className='mb-3'>{props.book.author}</p>
                <div className='flex flex-row justify-between items-center w-full'>
                    
                    <div className="card-actions">
                        <Link to={`/books/${props.book._id}`} className="btn bg-[#B3E240] font-bold">View</Link>
                    </div>
                    
                    <div className={`badge text-white p-3 rounded-md shadow-md ${props.book.availabilityStatus?"bg-[#FF00D3]":"bg-slate-500"}`}>{props.book.availabilityStatus?"Available":"Unavailable"}</div>

                </div>
            </div>
        </div>
    )
}

export default Card