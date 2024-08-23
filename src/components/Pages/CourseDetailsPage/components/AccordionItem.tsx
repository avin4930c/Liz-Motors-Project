import { FC } from 'react';

interface AccordionItemProps {
  section: {
    sectionTitle: string;
    sectionID: number;
    summary: {
      overview: string;
    };
  };
  isActive: boolean;
  onClick: () => void;
  completionStatus: boolean;
}

const AccordionItem: FC<AccordionItemProps> = ({ section, isActive, onClick, completionStatus }) => {
  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {section.sectionTitle}
        </span>
        <span className={`text-sm font-semibold ${completionStatus ? 'text-green-500' : 'text-red-500'}`}>
          {completionStatus ? 'Completed' : 'Not Completed'}
        </span>
      </button>
      {isActive && (
        <div className="p-4 text-gray-700 dark:text-gray-400">
          <p>{section.summary.overview}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;