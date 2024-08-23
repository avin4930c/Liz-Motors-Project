import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Course {
  sectionTitle: string;
  description: string;
}

const CourseSection: React.FC<{ course: Course[] }> = ({ course }) => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Liz Motors Training Program</h2>
      <p className="text-gray-700 dark:text-gray-400 mt-2">
        An in-depth training course covering advanced industrial concepts and technologies used in Liz Motors.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.map((item, index) => (
          <Link to="/course" key={index}>
            <div
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center mb-2">
                <FaBookOpen className="text-blue-500 dark:text-blue-400 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.sectionTitle}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
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

export default CourseSection;