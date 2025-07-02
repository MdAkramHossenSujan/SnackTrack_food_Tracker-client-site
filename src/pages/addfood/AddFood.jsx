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
  <div className="relative min-h-screen flex justify-center items-center py-24 px-2 md:px-4">
    {/* Crisp Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${board})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
    </div>

    {/* Solid Card */}
    <div className="relative z-10 w-full max-w-3xl rounded-2xl shadow-2xl md:p-8 p-4 ">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-green-500 dark:text-green-300 flex justify-center items-center gap-2">
        <FaPlusCircle /> Add New Food Item
      </h2>

      <form onSubmit={handleAddFood} className="grid grid-cols-1 gap-6">
        {/* Image Upload */}
        <div>
          <label className="block text-gray-200 mb-1">Food Image</label>
          <input
            onChange={handleImageUpload}
            type="file"
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-200 mb-1">Food Title</label>
          <input
            name="foodTitle"
            type="text"
            placeholder="Pick a title of your food"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-200 mb-1">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option disabled value="">
              Select Category
            </option>
            <option>Dairy</option>
            <option>Meat</option>
            <option>Vegetables</option>
            <option>Snacks</option>
            <option>Spices</option>
            <option>Drinks</option>
            <option>Fruit</option>
            <option>Oil</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-200 mb-1">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Write amount of your product"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-gray-200 mb-1">Unit</label>
          <input
            name="unit"
            type="text"
            placeholder="e.g. kg, pcs, pack"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Storage & Brand */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-200 mb-1">
              Storage Location
            </label>
            <input
              name="storageLocation"
              type="text"
              value="Fridge"
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-gray-200 mb-1">Brand</label>
            <input
              name="brand"
              type="text"
              placeholder="Brand of the product"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-gray-200 mb-1">Expiry Date</label>
          <input
            name="expiryDate"
            type="date"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-200 mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write your opinion and quality of food..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* User Email */}
        <div>
          <label className="block text-gray-200 mb-1">User Email</label>
          <input
            name="userEmail"
            type="email"
            readOnly
            value={user?.email || ''}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold transition duration-300 transform hover:scale-102 cursor-pointer shadow-lg hover:shadow-2xl"
        >
          Add Food
        </button>
      </form>
    </div>
  </div>
);

};

export default AddFood;