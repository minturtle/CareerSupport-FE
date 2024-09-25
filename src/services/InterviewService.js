import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/interview';

const InterviewApiService = {
    getAuthorizationHeader() {
        const token = localStorage.getItem('accessToken');
        return token ? `Bearer ${token}` : '';
    },

    async createTemplate(theme) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/new?theme=${encodeURIComponent(theme)}`,
                {},  // POST 요청의 body (필요한 경우 여기에 데이터를 추가할 수 있습니다)
                {
                    headers: {
                        'Authorization': this.getAuthorizationHeader(),
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error creating template:', error);
            throw error;
        }
    },

    async getMessages(templateId, cursor = null, size = 10) {
        try {
            const url = new URL(`${API_BASE_URL}/messages`);
            url.searchParams.append('templateId', templateId);
            url.searchParams.append('size', size);
            if (cursor) {
                url.searchParams.append('messageId', cursor);
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': this.getAuthorizationHeader(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },

    async sendAnswer(templateId, answer, onMessage, onError, onComplete) {
        try {
            const response = await fetch(`${API_BASE_URL}/answer/${templateId}`, {
                method: 'POST',
                headers: {
                    'Authorization': this.getAuthorizationHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answer }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                console.log(chunk);
                onMessage(chunk);
            }

            onComplete();
        } catch (error) {
            onError(error);
        }
    },

    async startInterview(templateId, onMessage, onError, onComplete) {
        try {
            const response = await fetch(`${API_BASE_URL}/start/${templateId}`, {
                method: 'POST',
                headers: {
                    'Authorization': this.getAuthorizationHeader(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                onMessage(chunk);
            }

            onComplete();
        } catch (error) {
            console.error('Error starting interview:', error);
            onError(error);
        }
    },

    async getTemplates(page = 0, size = 10) {
        try {
            const response = await fetch(`${API_BASE_URL}/templates?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Authorization': this.getAuthorizationHeader(),
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching templates:', error);
            throw error;
        }
    },
};

export default InterviewApiService;