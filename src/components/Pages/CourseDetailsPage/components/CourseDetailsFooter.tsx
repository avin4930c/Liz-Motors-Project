import { FC } from 'react';
import { Link } from 'react-router-dom';

interface CourseDetailsFooterProps {
  progressPercentage: number;
}

const CourseDetailsFooter: FC<CourseDetailsFooterProps> = ({ progressPercentage }) => {
  return (
    <div className="mt-8 flex justify-center">
      <Link to='/presentation'>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
        >
          {progressPercentage === 100 ? 'Watch Again' : 'Continue'}
        </button>
      </Link>
    </div>
  );
};

export default CourseDetailsFooter;