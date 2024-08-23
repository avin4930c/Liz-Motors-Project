import React from 'react';
import { Link } from 'react-router-dom';

interface ProgressProps {
  progressPercentage: number;
}

const ProgressSection: React.FC<ProgressProps> = ({ progressPercentage }) => {
  return (
    <section className="mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Course Progress</h2>
      <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: progressPercentage + "%" }}
        ></div>
      </div>
      <p className="text-gray-700 dark:text-gray-400 mt-2">{progressPercentage}% Completed</p>
      <div className="mt-6 flex justify-center">
        <Link to='/course'>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Go to Course
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProgressSection;