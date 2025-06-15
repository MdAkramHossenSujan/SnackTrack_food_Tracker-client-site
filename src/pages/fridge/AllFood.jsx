import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `http://localhost:5000/fridge?category=${category}`
      : 'http://localhost:5000/fridge';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, [category]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  // ✅ Loading check before rendering main UI
  if (loading) {
    return (
      <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
                    <span className="loading loading-spinner text-success"></span>
                </div>
    );
  }

  return (
    <div className="py-28 px-4">
      <h2 className="text-center text-3xl font-bold mb-6">Fridge For Your Foods</h2>

      <div className="mb-14 flex justify-end text-center">
        <label htmlFor="category" className="mr-2 font-semibold text-lg">Filter by Category:</label>
        <select
          id="category"
          value={category}
          onChange={handleChange}
          className="border cursor-pointer dark:bg-neutral-900 px-4 py-2 mb-10 rounded-md"
        >
          <option value="">All</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Snacks">Snacks</option>
          <option value="Spices">Spices</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-6">
        {foods.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFood;




