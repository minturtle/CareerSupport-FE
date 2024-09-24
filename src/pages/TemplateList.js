import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';



const InterviewTemplateListPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 5;

  // 가상의 템플릿 데이터
  const dummyTemplates = [
    { id: 1, title: 'React 프론트엔드 개발자', createdAt: '2023-05-15' },
    { id: 2, title: 'Node.js 백엔드 개발자', createdAt: '2023-05-14' },
    { id: 3, title: 'Python 데이터 사이언티스트', createdAt: '2023-05-13' },
    { id: 4, title: 'Java 안드로이드 개발자', createdAt: '2023-05-12' },
    { id: 5, title: 'iOS 앱 개발자', createdAt: '2023-05-11' },
    { id: 6, title: 'DevOps 엔지니어', createdAt: '2023-05-10' },
    { id: 7, title: 'UI/UX 디자이너', createdAt: '2023-05-09' },
    { id: 8, title: '클라우드 아키텍트', createdAt: '2023-05-08' },
    // ... 더 많은 템플릿 데이터
  ];

  // 현재 페이지의 템플릿 계산
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = dummyTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(dummyTemplates.length / templatesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">면접 템플릿 목록</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentTemplates.map((template) => (
              <li key={template.id}>
                <a href={`/templates/${template.id}`} className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                        {template.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                        <p>{template.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            이전
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastTemplate >= dummyTemplates.length}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewTemplateListPage;