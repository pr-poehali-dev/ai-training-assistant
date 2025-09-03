import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  type?: 'suggestion' | 'normal'
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ваш AI-помощник по системе СУПРИМ. Могу помочь с изучением функций, ответить на вопросы или показать, как выполнить нужную операцию. Что вас интересует?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Как создать проект в СУПРИМ?",
    "Где найти отчёты?",
    "Как добавить пользователя?",
    "Настройка уведомлений"
  ]

  const aiResponses = {
    "проект": "Для создания нового проекта:\n1. Перейдите в раздел 'Проекты'\n2. Нажмите кнопку 'Создать новый'\n3. Заполните название и описание\n4. Выберите участников команды\n5. Настройте параметры и нажмите 'Сохранить'",
    "отчёт": "Отчёты находятся в модуле 'Отчётность':\n• Стандартные отчёты - готовые шаблоны\n• Пользовательские - создавайте свои\n• Экспорт в Excel, PDF\n• Автоматическая рассылка по расписанию",
    "пользовател": "Управление пользователями:\n1. Админ панель → 'Пользователи'\n2. 'Добавить пользователя'\n3. Укажите роль и права доступа\n4. Отправьте приглашение\n\nДоступные роли: Администратор, Менеджер, Пользователь",
    "уведомлен": "Настройка уведомлений:\n• Профиль → Уведомления\n• Email, SMS, Push\n• Настройте частоту\n• Выберите типы событий\n• Рабочие часы для отправки"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const lowercaseText = text.toLowerCase()
      let aiResponse = "Отличный вопрос! Я помогу вам разобраться с этим. В СУПРИМ есть множество функций, и я готов объяснить любую из них подробно. Можете задать более конкретный вопрос?"

      // Find matching response
      for (const [key, response] of Object.entries(aiResponses)) {
        if (lowercaseText.includes(key)) {
          aiResponse = response
          break
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-source-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={goBack}
                className="hover:bg-gray-100"
              >
                <Icon name="ArrowLeft" size={18} />
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon name="Bot" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="font-inter font-semibold text-lg">AI Помощник СУПРИМ</h1>
                  <p className="text-sm text-gray-600">Онлайн • Готов помочь</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="animate-pulse">
              <Icon name="Zap" size={14} className="mr-1" />
              Активен
            </Badge>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-6 py-6 h-[calc(100vh-80px)] flex flex-col">
        <Card className="flex-1 flex flex-col animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="font-inter text-lg">Чат с помощником</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex items-start gap-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        message.sender === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.sender === 'user' ? 'Я' : 'AI'}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <div className="flex items-center gap-1 mt-2 opacity-70">
                          <Icon name="Clock" size={12} />
                          <span className="text-xs">
                            {message.timestamp.toLocaleTimeString('ru-RU', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                        AI
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-3">Популярные вопросы:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(inputText)
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Задайте вопрос о СУПРИМ..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!inputText.trim() || isTyping}
                  className="px-4"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                AI может делать ошибки. Проверяйте важную информацию.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}