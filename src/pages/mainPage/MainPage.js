import React from 'react';
import { PlusCircle, List, Moon, Sun } from 'lucide-react';

const MainPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen p-4 sm:p-8 transition-colors duration-200">
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-lg rounded-full transition duration-300 ease-in-out">
                로그인
              </button>
            </div>
          </header>

          <main>
            <section className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                AI 기반 개발자 취업 역량 강화 플랫폼
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
                맞춤형 모의 면접과 실시간 피드백으로 당신의 커리어를 지원합니다.
              </p>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md p-8 sm:p-10 mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-blue-800 dark:text-blue-300 mb-6">플랫폼 소개</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                CareerSupport는 개발자들의 취업 준비를 위한 혁신적인 AI 기반 플랫폼입니다. 
                맞춤형 모의 면접, 실시간 피드백, 그리고 지속적인 학습 기회를 제공합니다.
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
                <li>AI 기반 맞춤형 면접 시뮬레이션</li>
                <li>실시간 답변 평가 및 피드백</li>
                <li>다양한 기술 스택과 직무에 대한 준비</li>
              </ul>
            </section>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-md p-8 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
                <PlusCircle className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">새 AI 면접 템플릿 생성</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">맞춤형 면접 템플릿을 만들어 연습을 시작하세요.</p>
                <button className="bg-blue-500 text-white px-8 py-3 text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                  템플릿 생성하기
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-lg shadow-md p-8 flex flex-col items-center justify-center transition duration-300 ease-in-out hover:shadow-lg">
                <List className="w-20 h-20 text-blue-500 dark:text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">이전 면접 템플릿 보기</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-6">이전에 생성한 템플릿을 확인하고 복습하세요.</p>
                <button className="bg-blue-500 text-white px-8 py-3 text-lg rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                  템플릿 목록 보기
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;