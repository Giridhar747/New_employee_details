import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { server } from '../../config';

const Home = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleNavigate = () => {
        console.log('Navigating to /form');
        navigate('/form');
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching employee data...');
            try {
                const response = await fetch(`${server}/getall`);
                if (!response.ok) {
                    throw new Error(`Fetch error: ${response.status}`);
                }
                const result = await response.json();
                console.log('Fetched data:', result);
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
                toast.error('Failed to load employee data.', {
                    position: 'top-right',
                });
            }
        };

        fetchData();
    }, []);

    async function handleDelete(id) {
        try {
            console.log(`Deleting employee with id: ${id}`);
            const response = await axios.delete(`${server}/delete`, {
                params: { id: id }, 
            });
    
            if (response.status === 200) {
                toast.success('Employee deleted successfully!', {
                    position: 'top-right',
                });
                setData((prevData) => prevData.filter((employee) => employee.id !== id));
            } else {
                throw new Error(`Deletion failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee. Please try again.', {
                position: 'top-right',
            });
        }
    }
    

    return (
        <div className='bg-zinc-950'>
            <ToastContainer />
            <nav className="w-screen h-24 bg-zinc-950 flex items-center justify-between px-8 text-white">
                <h1 className="text-xl font-bold">Employee Management System</h1>
                <ul className="flex space-x-8">
                    <li className="hover:text-gray-400 cursor-pointer">Home</li>
                    <li className="hover:text-gray-400 cursor-pointer" onClick={handleNavigate}>
                        Manage Employee
                    </li>
                </ul>
            </nav>

            <div className="w-screen h-max bg-zinc-950 mt-5 p-8">
                {data === null ? (
                    <p className="text-white">Loading...</p>
                ) : Array.isArray(data) && data.length > 0 ? (
                    data.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white p-4 mb-4 rounded-lg flex flex-row justify-between"
                        >
                            <div>
                                <h2 className="text-black text-xl font-bold">Name: <span className='text-gray-500'>{student.name}</span></h2>
                                <p className="text-black mt-3 font-bold">Email: <span className='text-gray-500'>{student.email}</span></p>
                                <p className="text-black mt-3 font-bold">Department: <span className='text-gray-500'>{student.dept}</span></p>
                                <p className="text-black mt-3 font-bold">Phone Number: <span className='text-gray-500'>{student.ph_num}</span></p>
                                <p className="text-black mt-3 font-bold">Date of Birth: <span className='text-gray-500'>{student.dob}</span></p>
                                <p className="text-black mt-3 font-bold">Salary: <span className='text-gray-500'>{student.salary}</span></p>
                                <p className="text-black mt-3 font-bold">Address: <span className='text-gray-500'>{student.address}</span></p>
                            </div>
                            <div>
                                <button
                                    className="bg-indigo-600 text-white p-3 hover:bg-red-500 rounded-md"
                                    onClick={() => handleDelete(student.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No students available or an error occurred.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
