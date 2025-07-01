import React, { use, useEffect, useState } from 'react';
import board from '../../assets/Image/board2.jpg';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const AddFood = () => {
     const [image,setImage]=useState('')
    useEffect(() => {
        document.title = `Add Food | SnackTrack`;
        window.scrollTo(0, 0);
    }, []);
    const { user } = use(AuthContext)
    // console.log(user)
    const navigate = useNavigate();
const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image)
        console.log(formData)

        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API}`, formData)
        setImage(res.data.data.url)
    }
    const handleAddFood = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        // console.log(data)
        data.addedDate = new Date().toISOString();
        data.userEmail = user?.email;
        data.expiryDate = new Date(data.expiryDate).toISOString();
        const finalData={
            ...data,
            foodImage:image
        }
        console.log(finalData)
        axios.post('https://food-expiry-tracker-server.vercel.app/fridgeFoods', finalData,
            {
                headers: {
                    Authorization: `Bearer ${user.accessToken}` // Ensure this is set
                }
            }
        ).then(res => {
            if (res.status === 200) {
                toast.success(`Your ${data.quantity} ${data.unit} of ${data.foodTitle} added successfully`)
                navigate('/myfooditems')
            }
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
        form.reset()
    };

    return (
        <div className="relative min-h-screen py-20 flex items-center justify-center p-2">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${board})` }}
            ></div>

            <div className="relative z-10 p-4 rounded-lg max-w-3xl w-full">
                <h2 className="text-3xl text-white  font-bold text-center mb-6 flex items-center justify-center gap-2">
                    <FaPlusCircle className="dark:text-blue-600" /> Add New Food Item
                </h2>

                <form onSubmit={handleAddFood} className="grid grid-cols-1 gap-4">
                    <div className="form-control flex gap-2">
                        <label className="label text-gray-200">Food Image</label>
                        <input onChange={handleImageUpload} type="file" className="file-input w-full input-bordered" required />
                    </div>

                    <div className="form-control flex gap-2">
                        <label className="label text-gray-200">Food Title</label>
                        <input name="foodTitle" placeholder='Pick a title of your food' type="text" className="input w-full input-bordered" required />
                    </div>

                    <div className="form-control flex gap-2">
                        <label className="label text-gray-200">Category</label>
                        <select name="category" className="select select-bordered w-full" required>
                            <option disabled value="">Select Category</option>
                            <option>Dairy</option>
                            <option>Meat</option>
                            <option>Vegetables</option>
                            <option>Snacks</option>
                            <option>Spices</option>
                            <option>Drinks</option>
                            <option>Fruit</option>
                        </select>
                    </div>

                    <div className="form-control flex gap-2">
                        <label className="label text-gray-200">Quantity of the products</label>
                        <input name="quantity" type="number" min="1" placeholder='Write amount of your product' className="w-full input input-bordered" required />
                    </div>

                    <div className="form-control flex gap-2">
                        <label className="label text-gray-200">Unit of the products</label>
                        <input name="unit" type="text" placeholder="e.g. kg, pcs, pack" className="input w-full input-bordered" required />
                    </div>
                    <div className='flex justify-between'>
                        <div className="form-control flex gap-2">
                            <label className="label text-gray-200">Storage Location</label>
                            <input name="storageLocation" type="text" value={'Fridge'} className="input w-full input-bordered" readOnly />
                        </div>
                        <div className="form-control flex gap-2">
                            <label className="label text-gray-200">Brand</label>
                            <input name="brand" type="text" placeholder="Brand of the product" className="input w-full input-bordered" required />
                        </div>
                    </div>
                    <div className="form-control flex gap-1">
                        <label className="label text-gray-200">Expiry Date</label>
                        <input name="expiryDate" type="date" className="input w-full input-bordered" required />
                    </div>

                    <div className="form-control space-y-0.5">
                        <label className="label text-white">Description</label>
                        <textarea name="description" placeholder='Write Your opinion and quality of Food.......' rows="3" className="textarea w-full textarea-bordered" required></textarea>
                    </div>
                    <div className="form-control flex gap-1">
                        <label className="label text-gray-200">User Email</label>
                        <input name="userEmail" type="email" className="input w-full input-bordered" readOnly value={user?.email || ''} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 bg-green-800 hover:bg-white hover:text-black border-none w-full">Add Food</button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;