import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';

const InterviewChatPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [messages, setMessages] = useState([
    { type: 'ai', content: '안녕하세요! React 프론트엔드 개발자 면접을 시작하겠습니다. 준비되셨나요?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [interviewTheme, setIterviewTheme] = useState("React");


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }]);
      setInput('');
      // TODO: Implement AI response logic
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'ai', content: 'AI의 다음 질문이 여기에 표시됩니다.' }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{interviewTheme} 을/를 주제로 모의면접이 진행중입니다.</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[70%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
                  {message.type === 'user' ? <User size={24} className="text-white" /> : <Bot size={24} className="text-gray-700 dark:text-gray-300" />}
                </div>
                <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSend} className="bg-white dark:bg-gray-800 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="답변을 입력하세요..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewChatPage;