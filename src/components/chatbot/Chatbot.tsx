import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your beauty assistant. I can help you find the perfect products for your skin type and concerns. How can I help you today?',
      timestamp: new Date(),
      suggestions: [
        'Find products for oily skin',
        'Recommend a skincare routine',
        'Tell me about ingredients',
        'Help with makeup selection'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(message),
        timestamp: new Date(),
        suggestions: generateSuggestions(message)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('oily skin')) {
      return 'For oily skin, I recommend starting with a gentle foaming cleanser, followed by a BHA toner to control oil production. Look for products with salicylic acid, niacinamide, or tea tree oil. Would you like specific product recommendations?';
    }
    
    if (lowerMessage.includes('dry skin')) {
      return 'Dry skin needs extra hydration! I suggest using a cream-based cleanser, a hydrating toner, and a rich moisturizer with ingredients like hyaluronic acid, ceramides, or glycerin. Don\'t forget SPF during the day!';
    }
    
    if (lowerMessage.includes('acne')) {
      return 'For acne-prone skin, look for products with salicylic acid, benzoyl peroxide, or retinoids. It\'s important to introduce these gradually and always use sunscreen. I can recommend some gentle yet effective acne-fighting products.';
    }
    
    if (lowerMessage.includes('routine')) {
      return 'A basic skincare routine includes: Morning - Cleanser, Toner, Serum, Moisturizer, SPF. Evening - Cleanser, Toner, Treatment, Moisturizer. What\'s your skin type so I can personalize this for you?';
    }
    
    if (lowerMessage.includes('makeup')) {
      return 'I\'d love to help you with makeup! Are you looking for everyday makeup, special occasion looks, or specific products like foundation, lipstick, or eyeshadow? What\'s your skin tone and preferred coverage?';
    }
    
    return 'I understand you\'re looking for beauty advice! I can help you with skincare routines, product recommendations, ingredient information, and makeup tips. Could you tell me more about your specific concerns or what you\'re looking for?';
  };

  const generateSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('oily skin')) {
      return [
        'Show me oil-control products',
        'Recommend a BHA toner',
        'Find mattifying moisturizers',
        'Tell me about salicylic acid'
      ];
    }
    
    if (lowerMessage.includes('dry skin')) {
      return [
        'Show hydrating products',
        'Recommend face oils',
        'Find gentle cleansers',
        'Tell me about hyaluronic acid'
      ];
    }
    
    return [
      'Tell me about your skin type',
      'Recommend products for beginners',
      'Help with ingredient questions',
      'Find trending products'
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5" />
                  <span className="font-medium">Beauty Assistant</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-pink-200 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500">Quick suggestions:</p>
                  {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about beauty..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;