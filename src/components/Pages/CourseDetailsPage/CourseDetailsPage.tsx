import { useContext, useState } from 'react';
import { DataContext } from '../../../context/DataContext';
import AccordionItem from './components/AccordionItem';
import CourseDetailsHeader from './components/CourseDetailsHeader';
import CourseDetailsFooter from './components/CourseDetailsFooter';

const CourseDetailsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { user, course, progress } = useContext(DataContext);

  const getCompletionStatus = (sectionId: number) => {
    if (!user || !user.courseProgress) return false;
    const progressData = user.courseProgress.find((item) => item.sectionId === sectionId);
    return progressData ? progressData.completed : false;
  };

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-[70vh] w-full bg-gray-100 dark:bg-gray-800 mt-20 p-6">
      <main className="w-full max-w-screen-lg mx-auto">
        <CourseDetailsHeader />
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
          {course.map((content, index) => (
            <AccordionItem
              key={index}
              section={content}
              isActive={activeIndex === index}
              onClick={() => toggleAccordion(index)}
              completionStatus={getCompletionStatus(content.sectionID) ? true : false}
            />
          ))}
          <CourseDetailsFooter progressPercentage={progress.progressPercentage} />
        </section>
      </main>
    </div>
  );
};

export default CourseDetailsPage;