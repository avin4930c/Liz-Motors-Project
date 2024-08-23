import { FC } from 'react';

interface NavigationButtonsProps {
  handlePreviousVideo: () => void;
  handleNextVideo: () => void;
  isCurrentModuleCompleted: boolean;
  currentSectionIndex: number;
  courseLength: number;
}

const NavigationButtons: FC<NavigationButtonsProps> = ({
  handlePreviousVideo,
  handleNextVideo,
  isCurrentModuleCompleted,
  currentSectionIndex,
  courseLength
}) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 justify-center">
      <button
        onClick={handlePreviousVideo}
        disabled={currentSectionIndex === 0}
        className={`${
          currentSectionIndex === 0 ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
        } text-white py-2 px-4 rounded focus:ring-4 focus:outline-none focus:ring-blue-300 w-full sm:w-auto`}
      >
        Previous Video
      </button>
      <button
        onClick={handleNextVideo}
        disabled={currentSectionIndex >= courseLength - 1 || !isCurrentModuleCompleted}
        title={currentSectionIndex >= courseLength - 1 || !isCurrentModuleCompleted ? "Please complete the current module to proceed" : ""}
        className={`${
          currentSectionIndex >= courseLength - 1 || !isCurrentModuleCompleted
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        } text-white py-2 px-4 rounded transition-transform transform hover:scale-105 w-full sm:w-auto`}
      >
        Next Video
      </button>
    </div>
  );
};

export default NavigationButtons;