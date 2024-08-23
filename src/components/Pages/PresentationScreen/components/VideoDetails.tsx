import { FC } from 'react';

interface VideoDetailsProps {
  sectionTitle: string;
  videoTitle: string;
  summary: string;
  isCurrentModuleCompleted: boolean;
}

const VideoDetails: FC<VideoDetailsProps> = ({
  sectionTitle,
  videoTitle,
  summary,
  isCurrentModuleCompleted
}) => {
  return (
    <div className="mt-4 w-full text-center">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {sectionTitle} {videoTitle}
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-4">
        {summary}
      </p>
      <p className={`text-lg font-medium ${isCurrentModuleCompleted ? 'text-green-500' : 'text-yellow-500'}`}>
        {isCurrentModuleCompleted ? "Module Completed" : "In Progress"}
      </p>
    </div>
  );
};

export default VideoDetails;