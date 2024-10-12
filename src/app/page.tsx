import Link from "next/link"
import { Button } from "../app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../app/components/ui/card"
import { CheckCircle, FileText, MessageSquare, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LegalAI Assistant</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-blue-300 transition-colors">Features</a></li>
              <li><a href="#benefits" className="hover:text-blue-300 transition-colors">Benefits</a></li>
              <li><Link href="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
              <li><Link href="/chat" className="hover:text-blue-300 transition-colors">Chat</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            AI-Powered Legal Research<br />for the Digital Age
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Empower your legal practice with cutting-edge AI technology tailored for GDPR and EU AI Act compliance.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link href="/contact">Request a Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-blue-300 border-blue-300 hover:bg-blue-300 hover:text-gray-900">
              <Link href="/chat">Try the Chatbot</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="mb-20">
          <h3 className="text-3xl font-bold mb-10 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Shield className="mr-2 text-blue-300" />
                  GDPR Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Stay up-to-date with the latest GDPR regulations and interpretations.
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="mr-2 text-blue-300" />
                  EU AI Act Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Access comprehensive information on the EU AI Act and its implications.
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CheckCircle className="mr-2 text-blue-300" />
                  Case Report Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Quickly analyze relevant case reports, precedents, and judgments.
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MessageSquare className="mr-2 text-blue-300" />
                  Context-Aware AI Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                Interact with an AI assistant that understands your specific legal context.
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="benefits" className="mb-20">
          <h3 className="text-3xl font-bold mb-10 text-center">Benefits for Legal Professionals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <ul className="list-disc list-inside space-y-2">
              
              <li>Increase productivity and efficiency in legal research</li>
              <li>Stay updated with the latest tech law developments in Europe</li>
              <li>Prepare stronger arguments and advice for clients</li>
            </ul>
            <ul className="list-disc list-inside space-y-2">
              <li>Analyze compliance issues more effectively</li>
              <li>Access a wealth of relevant legal information at your fingertips</li>
              <li>Save time on manual research and document analysis</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to transform your legal practice?</h3>
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </section>
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