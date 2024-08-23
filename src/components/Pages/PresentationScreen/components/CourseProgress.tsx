import { FC } from 'react';

interface CourseProgressProps {
  progressPercentage: number;
  completedCourses: number;
  totalCourses: number;
}

const CourseProgress: FC<CourseProgressProps> = ({ progressPercentage, completedCourses, totalCourses }) => {
  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Course Progress</h3>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: progressPercentage + "%" }}
        ></div>
      </div>
      <p className="text-gray-700 dark:text-gray-400 mt-2">
        {completedCourses} / {totalCourses} Completed
      </p>
    </div>
  );
};

export default CourseProgress;