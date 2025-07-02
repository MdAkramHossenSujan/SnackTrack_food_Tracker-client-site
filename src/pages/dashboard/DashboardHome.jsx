import React, { useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const DashboardHome = () => {
     useEffect(() => {
            document.title = `Dashboard | SnackTrack`;
            window.scrollTo(0, 0);
        }, []);
    const { user } = useContext(AuthContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['fridgeFoods'],
        queryFn: async () => {
            const res = await axios.get('https://food-expiry-tracker-server.vercel.app/fridge');
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center min-h-screen py-12">
                <span className="loading loading-spinner text-green-600"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-600 font-semibold mt-10">Failed to load data.</div>;
    }

    const myFoods = data.filter(food => food.userEmail === user.email);
    const totalFoods = data.length;

    const today = new Date();
    const expiredCount = myFoods.filter(food => new Date(food.expiryDate) < today).length;
    const notExpiredCount = myFoods.length - expiredCount;

    const formatDate = (dateStr) => new Date(dateStr).toISOString().slice(0, 10);

    const last30Days = [...Array(30)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return formatDate(d);
    }).reverse();

    const addedPerDayMap = {};
    const expiryPerDayMap = {};
    last30Days.forEach(day => {
        addedPerDayMap[day] = 0;
        expiryPerDayMap[day] = 0;
    });

    myFoods.forEach(food => {
        const addedDay = formatDate(food.addedDate);
        const expiryDay = formatDate(food.expiryDate);

        if (addedPerDayMap.hasOwnProperty(addedDay)) {
            addedPerDayMap[addedDay]++;
        }
        if (expiryPerDayMap.hasOwnProperty(expiryDay)) {
            expiryPerDayMap[expiryDay]++;
        }
    });

    const chartData = last30Days.map(day => ({
        date: day,
        added: addedPerDayMap[day],
        expiring: expiryPerDayMap[day],
    }));

    let cumulativeAdded = 0;
    let cumulativeExpired = 0;
    const cumulativeData = chartData.map(({ date, added, expiring }) => {
        cumulativeAdded += added;
        cumulativeExpired += expiring;
        return {
            date,
            cumulativeAdded,
            cumulativeExpired,
        };
    });

    
    const categoryMap = {};
    myFoods.forEach(food => {
        categoryMap[food.category] = (categoryMap[food.category] || 0) + 1;
    });
    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    const quantityMap = {};
    myFoods.forEach(food => {
        const qty = parseFloat(food.quantity) || 0;
        quantityMap[food.category] = (quantityMap[food.category] || 0) + qty;
    });
    const quantityData = Object.entries(quantityMap).map(([name, value]) => ({ name, value }));

    const storageMap = {};
    myFoods.forEach(food => {
        storageMap[food.storageLocation] = (storageMap[food.storageLocation] || 0) + 1;
    });
    const storageData = Object.entries(storageMap).map(([name, value]) => ({ name, value }));

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const axisStroke = isDark ? '#ccc' : '#666';
    const gridStroke = isDark ? '#444' : '#ccc';

    return (
        <div className="max-w-7xl mx-auto min-h-screen px-6 xl:py-24 lg:py-14 py-8 space-y-10">
            {/* Stats cards */}
            <div className="bg-white dark:bg-gray-800 flex md:flex-row flex-col gap-6 justify-between shadow rounded-lg py-6 px-8 text-center">
                <div>
                    <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Foods</h3>
                    <p className="text-3xl font-bold text-green-600">{totalFoods}</p>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">All foods in system</p>
                </div>
                <hr className='border-dashed border-gray-400 md:hidden'/>
                <div>
                    <h3 className="text-xl md:text-2xl lg:text-4xl mb-2 text-gray-700 dark:text-gray-200">My Added Foods</h3>
                    <p className="text-3xl font-bold text-blue-600">{myFoods.length}</p>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">Foods added by you</p>
                </div>
                   <hr className='border-dashed border-gray-400 md:hidden'/>
                <div>
                    <h3 className="text-xl md:text-2xl lg:text-4xl mb-2 text-gray-700 dark:text-gray-200">Food Expiry Status</h3>
                    <div className='flex justify-between'>
                        <div >
                        <p className="text-4xl font-bold text-red-600">{expiredCount}</p>
                        <p className="text-sm text-red-500 mt-1">Expired</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-green-600 ">{notExpiredCount}</p>
                        <p className="text-sm text-green-500 mt-1">Not Expired</p>
                    </div>
                    </div>
                </div>
            </div>

            {/* Bar chart: added vs expiring daily */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Daily Added vs Expiring (Last 30 Days)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="date" stroke={axisStroke} tick={{ fontSize: 10 }} />
                        <YAxis stroke={axisStroke} allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="added" fill="#3b82f6" name="Added" />
                        <Bar dataKey="expiring" fill="#ef4444" name="Expiring" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line chart: cumulative added & expired */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Cumulative Added & Expired Foods (Last 30 Days)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={cumulativeData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="date" stroke={axisStroke} tick={{ fontSize: 10 }} />
                        <YAxis stroke={axisStroke} allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cumulativeAdded" stroke="#3b82f6" name="Cumulative Added" strokeWidth={2} />
                        <Line type="monotone" dataKey="cumulativeExpired" stroke="#ef4444" name="Cumulative Expired" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie chart: category distribution */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 max-w-7xl mx-auto">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Food Category Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bar chart: quantity by category */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Quantity by Category
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={quantityData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                        <XAxis dataKey="name" stroke={axisStroke} />
                        <YAxis stroke={axisStroke} allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" name="Quantity" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie chart: storage location breakdown */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 max-w-7xl mx-auto">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">
                    Storage Location Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={storageData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                            label
                        >
                            {storageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardHome;


