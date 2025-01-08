import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js'


const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50">
            <div className="navbar-start">
                {authUser && (
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a href="/">Home</a></li>
                            <li><a href="/books">All Books</a></li>
                            <li><a href="/myBooks">My Books</a></li>
                            {authUser.role === "admin" && (

                                // <li><a href="/admin">Admin</a></li>
                                <li>
                                    <a>Admin Controls</a>
                                    <ul className="p-2">
                                        <li><a href="/add-book">Add a Book</a></li>
                                        <li><a href="/transactions">View all Transactions</a></li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className="navbar-center">
                <a href="/" className="btn btn-ghost text-2xl font-bold ">Infiniti Library</a>
            </div>
            <div className="navbar-end">
                {/* {authUser && (
                    <div className="form-control hidden mx-2 md:block">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                )} */}

                {!authUser && (
                    <Link to="/login" className="btn   mr-2 md:mx-2 text-[16px] btn-accent">Login</Link>
                )}

                {authUser && (
                    <Link onClick={logout} className="btn   mr-2 md:mx-2 text-[16px] bg-red-500 btn-warning">Logout</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar