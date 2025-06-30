import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { FaSearch } from 'react-icons/fa';
import noData from '../../assets/Animation/Animation - 1751316496789(No Data).json'
import Lottie from 'lottie-react';
const AllFood = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [expiredFilter, setExpiredFilter] = useState('');

    useEffect(() => {
        document.title = `Fridge | SnackTrack`;
        window.scrollTo(0, 0);
    }, []);

    // Fetch foods on category change
    useEffect(() => {
        setLoading(true);
        const url = category
            ? `https://food-expiry-tracker-server.vercel.app/fridge?category=${category}`
            : 'https://food-expiry-tracker-server.vercel.app/fridge';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                // Compute expired field for each item
                const enriched = data.map(item => ({
                    ...item,
                    expired: new Date(item.expiryDate) < new Date(),
                }));
                setAllFoods(enriched);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [category]);
    console.log(allFoods)
    // Fetch foods on search
    useEffect(() => {
        if (searchText === '') return;

        setLoading(true);
        fetch(`https://food-expiry-tracker-server.vercel.app/fridge/search?q=${searchText}`)
            .then(res => res.json())
            .then(data => {
                const enriched = data.map(item => ({
                    ...item,
                    expired: new Date(item.expiryDate) < new Date(),
                }));
                setAllFoods(enriched);
                setLoading(false);
            })
            .catch(err => {
                console.error('Search error:', err);
                setLoading(false);
            });
    }, [searchText]);

    // Local expired filtering
    useEffect(() => {
        let data = [...allFoods];
        if (expiredFilter) {
            data = data.filter(item =>
                expiredFilter === "true"
                    ? item.expired === true
                    : item.expired === false
            );
        }
        setFilteredFoods(data);
    }, [expiredFilter, allFoods]);
    console.log(filteredFoods)
    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.search.value.trim());
    };

    const handleExpiredChange = (e) => {
        setExpiredFilter(e.target.value);
    };

    const handleClearFilters = () => {
        setCategory('');
        setSearchText('');
        setExpiredFilter('');
    };

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <span className="loading loading-spinner loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <div className="py-28 px-4">
            <h2 className="text-center text-3xl font-bold mb-6">
                Fridge For Your Foods
            </h2>

            <div className="mb-14 max-w-7xl mx-auto bg-base-100 shadow-md rounded-xl p-6 space-y-6">
                {/* FILTERS */}
                <form onSubmit={handleSearch} className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                    {/* SEARCH */}
                    <div className="form-control w-full">
                        <label className="label font-semibold">Search Food</label>
                        <div className="flex gap-2">
                            <input
                                name="search"
                                type="text"
                                placeholder="Type title, category or brand"
                                defaultValue={searchText}
                                className="input input-bordered input-success w-full"
                            />
                            <button type="submit" className="btn btn-success">
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="form-control w-full">
                        <label htmlFor="category" className="label font-semibold">Filter by Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleChange}
                            className="select select-bordered select-success w-full"
                        >
                            <option value="">All</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Meat">Meat</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Spices">Spices</option>
                        </select>
                    </div>

                    {/* EXPIRED FILTER */}
                    <div className="form-control w-full">
                        <label className="label font-semibold">Status</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="expired"
                                    value=""
                                    checked={expiredFilter === ''}
                                    onChange={handleExpiredChange}
                                    className="radio radio-success"
                                />
                                <span className="ml-2">All</span>
                            </label>
                            <label className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="expired"
                                    value="false"
                                    checked={expiredFilter === 'false'}
                                    onChange={handleExpiredChange}
                                    className="radio radio-success"
                                />
                                <span className="ml-2">Not Expired</span>
                            </label>
                            <label className="label cursor-pointer">
                                <input
                                    type="radio"
                                    name="expired"
                                    value="true"
                                    checked={expiredFilter === 'true'}
                                    onChange={handleExpiredChange}
                                    className="radio radio-success"
                                />
                                <span className="ml-2">Expired</span>
                            </label>
                        </div>
                    </div>
                </form>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        type="button"
                        className="btn btn-outline btn-error"
                        onClick={handleClearFilters}
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* CARDS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-6">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food, index) => (
                        <FoodCard key={index} food={food} />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12">
                        <div className="w-40 md:w-96 lg:w-[540px]">
                            <Lottie animationData={noData} loop autoplay />
                        </div>
                        <h3 className="text-xl md:text-3xl font-semibold text-gray-600 mt-6 text-center">
                            No matching food items found.
                        </h3>
                        <p className="text-gray-400 mt-2 text-sm md:text-base text-center max-w-md">
                            Try adjusting your filters, search different keywords, or clear all filters to see all food items again.
                        </p>
                    </div>


                )}
            </div>
        </div>
    );
};

export default AllFood;





