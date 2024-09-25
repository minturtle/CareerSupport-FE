import React from 'react';
import { PlusCircle, List, Moon, Sun } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';
import { Link } from 'react-router-dom';
import MainBanner from '../components/MainBanner';
const MainPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-16 space-y-4 sm:space-y-0">
          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
            <img
              src={darkMode ? "images/logo-dark.png" : "images/logo-light.png"}
              alt="CareerSupport Logo"
              className="h-16 sm:h-20 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-lg rounded-full transition duration-300 ease-in-out">
                로그인
              </button>
            </Link>

          </div>
        </header>

        <main>
          <section className="mb-12 sm:mb-16">
            <MainBanner />
          </section>


          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-md p-8 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
              <PlusCircle className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">새 AI 면접 템플릿 생성</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">맞춤형 면접 템플릿을 만들어 연습을 시작하세요.</p>
              <Link to="interview/template">
                <button className="bg-blue-500 text-white px-8 py-3 text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                  템플릿 생성하기
                </button>
              </Link>

            </div>

            <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-md p-8 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
              <List className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6" />
              <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">이전 면접 템플릿 보기</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">이전에 생성한 템플릿을 확인하고 복습하세요.</p>
              <Link to="interview/list">
                <button className="bg-blue-500 text-white px-8 py-3 text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                  템플릿 목록 보기
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;