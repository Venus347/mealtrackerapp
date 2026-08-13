import React from 'react';
import { MacroPieChart } from '../components/charts/MacroPieChart';
import { BMITrendChart } from '../components/charts/BMITrendChart';
import { CalorieBarChart } from '../components/charts/CalorieBarChart';

const Dashboard: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Diet & BMI Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MacroPieChart />
          <CalorieBarChart />
          <div className="md:col-span-2 lg:col-span-3">
            <BMITrendChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
