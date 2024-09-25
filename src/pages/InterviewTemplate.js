import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import InterviewApiService from '../services/InterviewService';

import UnAuthorizedError from "../errors/UnAuthorizedErrors";


const InterviewTemplatePage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [theme, setTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await InterviewApiService.createTemplate(theme);

      navigate('/interview/chat', { state: { templateId: result.interviewId, theme: result.theme } });
    } catch (err) {
      if (err instanceof UnAuthorizedError) {
        alert('로그인이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate("/login");
      }

    } finally {
      setIsLoading(false);
    }

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
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? '생성 중...' : '템플릿 생성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewTemplatePage;