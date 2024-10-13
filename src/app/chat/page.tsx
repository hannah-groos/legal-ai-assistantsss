"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { PaperclipIcon, SendIcon, XIcon } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to LegalAI Assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (input.trim() === "" && files.length === 0) return

    const newMessages = [
      ...messages,
      { role: "user", content: input, files: files.map(f => f.name) },
    ]
    setMessages(newMessages)
    setInput("")
    setFiles([])

    // TODO: Implement actual API call to Perplexity AI here
    // For now, we'll just simulate a response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { role: "system", content: "I've received your message and files. However, as this is a demo, I can't actually process them. In a real implementation, I would analyze your query and the uploaded documents." },
      ])
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files || [])])
    }
  }

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LegalAI Assistant</h1>
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
              <CardTitle className="text-2xl font-bold">Chat with LegalAI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[calc(100vh-400px)] overflow-y-auto mb-4 p-4 border border-gray-800 rounded-md">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                      {message.content}
                      {message.files && message.files.length > 0 && (
                        <div className="mt-2 text-sm">
                          Attached files: {message.files.join(", ")}
                        </div>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center bg-gray-800 text-gray-200 text-sm rounded-full px-3 py-1">
                        <span className="truncate max-w-xs">{file.name}</span>
                        <button onClick={() => removeFile(file.name)} className="ml-2 text-gray-400 hover:text-gray-200">
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    multiple
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={triggerFileInput}
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                  <Button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600">
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
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
                <li>Attach relevant documents using the paperclip icon</li>
                <li>Click the send button or press Enter to submit</li>
                <li>The AI will analyze your query and attached documents</li>
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