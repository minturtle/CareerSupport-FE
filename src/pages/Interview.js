import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, User, Bot, Sun, Moon } from 'lucide-react';
import { useTheme } from '../utils/ThemeProvider';
import { useLocation } from 'react-router-dom';
import InterviewApiService from "../services/InterviewService"


const InterviewChatPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [templateId, setTemplateId] = useState(null);
  const [interviewTheme, setInterviewTheme] = useState("React");
  const location = useLocation();

  const loadMessages = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await InterviewApiService.getMessages(templateId, cursor);
      setMessages(prevMessages => [...response.data, ...prevMessages]);
      setCursor(response.cursor);
      setHasMore(response.cursor !== null);

      // 메시지가 없고 cursor가 null이면 인터뷰 시작
      if (response.data.length === 0 && response.cursor === null) {
        await startInterview();
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      alert('메시지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [templateId, cursor, hasMore, isLoading]);

  const startInterview = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve, reject) => {
        InterviewApiService.startInterview(
          templateId,
          (data) => {
            setMessages(prev => [...prev, { type: 'ai', content: data }]);
          },
          (error) => {
            console.error('Error starting interview:', error);
            reject(error);
          },
          resolve
        );
      });
    } catch (error) {
      console.error('Error in startInterview:', error);
      alert('인터뷰 시작 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (!location.state || !location.state.templateId) {
        return;
      }

      setTemplateId(location.state.templateId);
      setInterviewTheme(location.state.theme);
    };

    fetchInterviewData();
  }, [location]);

  useEffect(() => {
    if (templateId) {
      loadMessages();
    }
  }, [templateId, loadMessages]);

  const handleScroll = () => {
    const { scrollTop } = messagesContainerRef.current;
    if (scrollTop === 0 && hasMore) {
      loadMessages();
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const userMessage = { type: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      let aiMessage = { type: 'ai', content: '' };
      setMessages(prev => [...prev, aiMessage]);

      const updateAiMessage = (content) => {
        setMessages(prev => prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, content: msg.content + content } : msg
        ));
      };

      try {
        await InterviewApiService.sendAnswer(
          templateId,
          input,
          (data) => updateAiMessage(data),
          (error) => {
            console.error('Error in sendAnswer:', error);
            alert('답변 전송 중 오류가 발생했습니다.');
          },
          () => {
            console.log('Answer sending completed');
          }
        );
      } catch (error) {
        console.error('Error in handleSend:', error);
        alert('답변 전송 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
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

      <div
        className="flex-1 overflow-y-auto p-4"
        ref={messagesContainerRef}
        onScroll={handleScroll}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {isLoading && cursor && <div className="text-center">메시지를 불러오는 중...</div>}
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
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewChatPage;