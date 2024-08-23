import { FC } from 'react';

interface PageButtonsProps {
  courseLength: number;
  currentSectionIndex: number;
  handlePageChange: (index: number) => void;
  completedSections: number[]; // List of completed sections
}

const PageButtons: FC<PageButtonsProps> = ({
  courseLength,
  currentSectionIndex,
  handlePageChange,
  completedSections
}) => {
  return (
    <div className="flex space-x-2 justify-center mt-4">
      {Array.from({ length: courseLength }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={index > currentSectionIndex && !completedSections.includes(index)}
          className={`py-2 px-4 rounded`}
          style={{
            backgroundColor: currentSectionIndex === index ? "#1d4ed8" : "#d1d5db",
            color: currentSectionIndex === index ? "#ffffff" : "#374151",
            border: 'none',
            cursor: index > currentSectionIndex && !completedSections.includes(index) ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '1rem',
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PageButtons;