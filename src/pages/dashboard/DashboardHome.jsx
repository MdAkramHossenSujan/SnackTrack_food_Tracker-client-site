import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, LineChart, CartesianGrid } from 'recharts';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fridgeFoods'],
    queryFn: async () => {
      const res = await axios.get('https://food-expiry-tracker-server.vercel.app/fridge');
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner text-green-600"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center text-red-600 font-semibold mt-10">Failed to load data.</div>;
  }

  // Filter by user email (my foods)
  const myFoods = data.filter(food => food.userEmail === user.email);
  const totalFoods = data.length;

  // Expired vs not expired counts
  const today = new Date();
  const expiredCount = myFoods.filter(food => new Date(food.expiryDate) < today).length;
  const notExpiredCount = myFoods.length - expiredCount;

  // Prepare chart data (group by date added and expiry)
  // We'll bucket addedDate and expiryDate by day (YYYY-MM-DD)

  // Helper to format date string (YYYY-MM-DD)
  const formatDate = (dateStr) => new Date(dateStr).toISOString().slice(0, 10);

  // Count added foods per day (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return formatDate(d);
  }).reverse();

  const addedPerDayMap = {};
  const expiryPerDayMap = {};

  last7Days.forEach(day => {
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

  const chartData = last7Days.map(day => ({
    date: day,
    added: addedPerDayMap[day],
    expiring: expiryPerDayMap[day],
  }));

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Foods vs My Foods */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Foods</h3>
          <p className="text-3xl font-bold text-green-600">{totalFoods}</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">All foods in system</p>

          <h3 className="mt-6 text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">My Added Foods</h3>
          <p className="text-3xl font-bold text-blue-600">{myFoods.length}</p>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Foods added by you</p>
        </div>

        {/* Expired vs Not Expired */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Food Expiry Status</h3>

          <div className="flex justify-around space-x-6">
            <div>
              <p className="text-4xl font-bold text-red-600">{expiredCount}</p>
              <p className="text-sm text-red-500 mt-1">Expired</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">{notExpiredCount}</p>
              <p className="text-sm text-green-500 mt-1">Not Expired</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">Last 7 Days: Added vs Expiry</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#444' : '#ccc'} />
              <XAxis dataKey="date" stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ccc' : '#666'} />
              <YAxis stroke={window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ccc' : '#666'} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="added" fill="#3b82f6" name="Added" />
              <Bar dataKey="expiring" fill="#ef4444" name="Expiring" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
