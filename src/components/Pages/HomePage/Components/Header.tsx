import React from 'react';

interface HeaderProps {
  name: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ name, email }) => {
  return (
    <header className="mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome, {name}!</h1>
      <p className="text-gray-700 dark:text-gray-400 mt-2">Email: {email}</p>
    </header>
  );
};

export default Header;