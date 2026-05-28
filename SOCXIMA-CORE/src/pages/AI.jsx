import React, { useState } from 'react';
import { Brain, Send } from 'lucide-react';
import '../styles/pages/AI.css';

function AI() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '¡Hola! Soy el asistente IA de SOCXIMA. ¿Cómo puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, type: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(m => [...m, { id: m.length + 1, type: 'bot', text: '🤖 Procesando tu pregunta...' }]);
      }, 500);
    }
  };

  return (
    <div className="ai-page">
      <h1>🤖 Asistente IA</h1>
      
      <div className="ai-features">
        <div className="feature-box">
          <Brain className="feature-icon" />
          <h3>Análisis Inteligente</h3>
          <p>Análisis de mercado en tiempo real</p>
        </div>
        <div className="feature-box">
          <Brain className="feature-icon" />
          <h3>Recomendaciones</h3>
          <p>Sugerencias personalizadas</p>
        </div>
        <div className="feature-box">
          <Brain className="feature-icon" />
          <h3>Predicciones</h3>
          <p>Predicciones basadas en IA</p>
        </div>
      </div>

      <div className="chatbox">
        <div className="messages">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Escribe tu pregunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="send-btn">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AI;