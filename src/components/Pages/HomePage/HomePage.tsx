import React, { useContext } from 'react';
import Header from './Components/Header';
import ProgressSection from './Components/ProgressSection';
import CourseSection from './Components/CourseSection';
import { DataContext } from '../../../context/DataContext';

const HomePage: React.FC = () => {
  const { user, progress } = useContext(DataContext);

  const courseMain = [
    {
      sectionTitle: "Section 1: Introduction",
      description: "Introduction to the training module, covering the basic objectives and goals.",
    },
    {
      sectionTitle: "Section 2: Advanced Topics",
      description: "Detailed analysis of advanced topics relevant to the training module.",
    },
    {
      sectionTitle: "Section 3: Final Thoughts",
      description: "Summary of the training module and guidance on next steps.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-800 mt-20">
      <main className="w-full p-4 max-w-screen-xl mx-auto">
        <Header name={user?.name || ''} email={user?.email || ''} />
        <ProgressSection progressPercentage={progress.progressPercentage} />
        <CourseSection course={courseMain} />
      </main>
    </div>
  );
};

export default HomePage;