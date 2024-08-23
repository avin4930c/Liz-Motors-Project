import { FC } from 'react';

const SummarySection: FC = () => {
  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Summary</h3>
      <p className="text-gray-700 dark:text-gray-400">
        This is the summary section. Here, you can provide a detailed summary of the video content or any other relevant information. This space is reserved for a more in-depth explanation or key takeaways from the video.
      </p>
    </div>
  );
};

export default SummarySection;