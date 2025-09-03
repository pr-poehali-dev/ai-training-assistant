import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Icon from '@/components/ui/icon'

export default function Index() {
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Что такое СУПРИМ?",
      options: ["CRM система", "ПО для управления проектами", "Система документооборота", "ERP система"],
      correct: 1
    },
    {
      question: "Как создать новый проект в СУПРИМ?",
      options: ["Файл > Новый", "Проекты > Создать", "Главная > Добавить", "Настройки > Проект"],
      correct: 1
    },
    {
      question: "Где находятся отчёты в СУПРИМ?",
      options: ["Главная панель", "Модуль отчётности", "Настройки", "Файлы"],
      correct: 1
    }
  ]

  const modules = [
    {
      title: "Основы СУПРИМ",
      description: "Изучите базовые принципы работы с системой",
      progress: 75,
      difficulty: "Новичок",
      duration: "30 мин",
      icon: "BookOpen"
    },
    {
      title: "Управление проектами",
      description: "Создание и ведение проектов в СУПРИМ",
      progress: 45,
      difficulty: "Средний",
      duration: "45 мин",
      icon: "FolderOpen"
    },
    {
      title: "Отчётность и аналитика",
      description: "Формирование отчётов и анализ данных",
      progress: 20,
      difficulty: "Продвинутый",
      duration: "60 мин",
      icon: "BarChart3"
    }
  ]

  const handleAnswer = (answer: number) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const finalScore = answer === questions[currentQuestion].correct ? score + 1 : score
      if (finalScore >= 2) {
        setCurrentLevel('advanced')
      } else if (finalScore === 1) {
        setCurrentLevel('intermediate')
      } else {
        setCurrentLevel('beginner')
      }
      setTestStarted(false)
      setCurrentQuestion(0)
      setScore(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-source-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              AI Обучающий Ассистент
            </Badge>
            <h1 className="text-5xl font-bold font-inter text-gray-900 mb-6">
              Изучите <span className="text-primary">СУПРИМ</span> быстро и эффективно
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Персонализированное обучение с адаптацией под ваш уровень знаний. 
              ИИ-помощник проведёт вас через все функции системы.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <Tabs defaultValue="test" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="test" className="flex items-center gap-2">
              <Icon name="Brain" size={20} />
              Тестирование
            </TabsTrigger>
            <TabsTrigger value="learning" className="flex items-center gap-2">
              <Icon name="GraduationCap" size={20} />
              Обучение
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={20} />
              Поддержка
            </TabsTrigger>
          </TabsList>

          {/* Тестирование */}
          <TabsContent value="test" className="space-y-6">
            <Card className="animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="font-inter text-2xl">Определение уровня знаний</CardTitle>
                <CardDescription>
                  Пройдите тест для персонализации обучения под ваш уровень
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!testStarted ? (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center space-x-4">
                      <Badge variant={currentLevel === 'beginner' ? 'default' : 'secondary'}>
                        Новичок
                      </Badge>
                      <Badge variant={currentLevel === 'intermediate' ? 'default' : 'secondary'}>
                        Средний
                      </Badge>
                      <Badge variant={currentLevel === 'advanced' ? 'default' : 'secondary'}>
                        Продвинутый
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Текущий уровень: <strong>{
                        currentLevel === 'beginner' ? 'Новичок' :
                        currentLevel === 'intermediate' ? 'Средний' : 'Продвинутый'
                      }</strong>
                    </p>
                    <Button 
                      onClick={() => setTestStarted(true)} 
                      size="lg"
                      className="animate-fade-in"
                    >
                      Начать тест
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        Вопрос {currentQuestion + 1} из {questions.length}
                      </span>
                      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32" />
                    </div>
                    
                    <Card className="bg-blue-50">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-4">
                          {questions[currentQuestion].question}
                        </h3>
                        <div className="space-y-2">
                          {questions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="w-full justify-start text-left h-auto p-4"
                              onClick={() => handleAnswer(index)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Обучение */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <Card key={index} className="animate-scale-in hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon name={module.icon as any} size={24} className="text-primary" />
                      </div>
                      <Badge variant="outline">{module.difficulty}</Badge>
                    </div>
                    <CardTitle className="font-inter text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Прогресс</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {module.duration}
                      </div>
                      <Button 
                        variant={module.progress > 0 ? "default" : "outline"}
                        size="sm"
                      >
                        {module.progress > 0 ? "Продолжить" : "Начать"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-inter">Адаптивное обучение</CardTitle>
                <CardDescription>
                  Система автоматически подбирает контент под ваш текущий уровень
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Icon name="Target" size={32} className="mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold">Персонализация</h4>
                    <p className="text-sm text-gray-600">Контент адаптируется под ваши знания</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold">Прогресс</h4>
                    <p className="text-sm text-gray-600">Отслеживание вашего развития</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Icon name="Zap" size={32} className="mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold">Эффективность</h4>
                    <p className="text-sm text-gray-600">Быстрое освоение материала</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Поддержка */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name="Bot" size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-inter">AI Помощник</CardTitle>
                      <CardDescription>Получите мгновенную помощь 24/7</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                        AI
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Привет! Я ваш AI-помощник по СУПРИМ. Задайте любой вопрос о системе, 
                          и я помогу найти ответ или покажу, как выполнить нужную операцию.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Начать чат с помощником
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-inter">Часто задаваемые вопросы</CardTitle>
                  <CardDescription>Быстрые ответы на популярные вопросы</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Как начать работу с СУПРИМ?</AccordionTrigger>
                      <AccordionContent>
                        Начните с прохождения теста для определения уровня, затем выберите 
                        подходящий обучающий модуль. Система автоматически адаптирует контент.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Как создать новый проект?</AccordionTrigger>
                      <AccordionContent>
                        Перейдите в раздел "Проекты" → "Создать новый". Заполните основную 
                        информацию и настройте параметры проекта согласно вашим требованиям.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Где найти отчёты?</AccordionTrigger>
                      <AccordionContent>
                        Все отчёты доступны в модуле "Отчётность". Вы можете создавать 
                        пользовательские отчёты или использовать готовые шаблоны.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-inter">Дополнительная поддержка</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Icon name="FileText" size={20} />
                    <span className="text-sm">Документация</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Icon name="Video" size={20} />
                    <span className="text-sm">Видеоуроки</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Icon name="Users" size={20} />
                    <span className="text-sm">Сообщество</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}