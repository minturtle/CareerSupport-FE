import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';

const InterviewTemplatePage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [duration, setDuration] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement template creation logic
    console.log('Creating new template:', { topic, difficulty, duration });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">모의 면접 템플릿 생성</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="topic">
              면접 주제
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="topic"
              type="text"
              placeholder="예: 데이터베이스 트랜젝션"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              템플릿 생성
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewTemplatePage;