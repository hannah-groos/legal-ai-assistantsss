"use client";

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { PaperclipIcon, SendIcon } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to LegalAI Assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [file, setFile] = useState(null)

  const handleSend = async () => {
    if (input.trim() === "") return

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ]
    setMessages(newMessages)
    setInput("")

    // TODO: Implement actual API call to Perplexity AI here
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: "system", content: "I'm sorry, I'm just a demo. I can't actually process your request." },
      ])
    }, 1000)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LegalAI Assistant</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="/contact" className="hover:text-blue-300 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Chat with LegalAI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[calc(100vh-400px)] overflow-y-auto mb-4 p-4 border border-gray-800 rounded-md">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                      {message.content}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="icon" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                </label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message  here..."
                  className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
              {file && <p className="mt-2 text-sm text-gray-300">File attached: {file.name}</p>}
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold">How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-200">
                <li>Type your legal query in the chat box</li>
                <li>Attach relevant documents using the paperclip icon</li>
                <li>Click the send button or press Enter to submit</li>
                <li>The AI will analyze your query and provide a response</li>
                <li>You can ask follow-up questions or start a new topic</li>
              </ol>
              <p className="mt-4 text-sm text-gray-300">
                Remember: The AI assistant is knowledgeable about GDPR, the EU AI Act, and can analyze case reports. It's here to assist you in your legal research and analysis.
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