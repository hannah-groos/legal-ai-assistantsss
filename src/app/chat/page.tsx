"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { SendIcon } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to Lawful LLama. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "") return

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      const conversationHistory = newMessages
        .filter(m => m.role !== "system")
        .map(m => `${m.role}: ${m.content}`)
      
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: input,
          conversation_history: conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      setMessages([
        ...newMessages,
        { role: "system", content: data.response },
      ])
    } catch (error) {
      console.error('Error:', error)
      setMessages([
        ...newMessages,
        { role: "system", content: "I'm sorry, but I encountered an error while processing your request. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Lawful LLama</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:text-blue-300 transition-colors">Home</Link></li>
              <li><Link href="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Chat with Lawful LLama</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={chatContainerRef} className="h-[calc(100vh-400px)] overflow-y-auto mb-4 p-4 border border-gray-800 rounded-md">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                      {message.role === "user" ? (
                        message.content
                      ) : (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
                            p: ({node, ...props}) => <p className="my-2" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside my-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2" {...props} />,
                            li: ({node, ...props}) => <li className="my-1" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? (
                                <code className="bg-gray-700 rounded px-1" {...props} />
                              ) : (
                                <code className="block bg-gray-700 rounded p-2 my-2 overflow-x-auto" {...props} />
                              ),
                            table: ({node, ...props}) => <table className="border-collapse border border-gray-600 my-2" {...props} />,
                            th: ({node, ...props}) => <th className="border border-gray-600 px-2 py-1" {...props} />,
                            td: ({node, ...props}) => <td className="border border-gray-600 px-2 py-1" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center">
                    <span className="inline-block p-3 rounded-lg bg-gray-800 text-gray-100">
                      Thinking...
                    </span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-200">
                <li>Type your legal query in the chat box</li>
                <li>Click the send button or press Enter to submit</li>
                <li>The AI will analyze your query and provide a response</li>
                <li>You can ask follow-up questions or start a new topic</li>
              </ol>
              <p className="mt-4 text-sm text-gray-300">
                Remember: The AI assistant is knowledgeable about GDPR, the EU AI Act, and can provide legal insights. It's here to assist you in your legal research and analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-300">
          <p>&copy; 2023 LegalAI Assistant. All rights reserved.</p>
          <p>Created for the HackTrinity GenAixLaw Hackathon</p>
        </div>
      </footer>
    </div>
  )
}
