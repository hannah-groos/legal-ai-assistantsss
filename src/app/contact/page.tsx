import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Textarea } from "../components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LegalAI Assistant</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="/chat" className="hover:text-blue-300 transition-colors">Chat</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Name</Label>
                <Input id="name" placeholder="Your full name" required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-gray-200">Company</Label>
                <Input id="company" placeholder="Your law firm or company" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">I'm interested in:</Label>
                <RadioGroup defaultValue="demo">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="demo" id="demo" />
                    <Label htmlFor="demo" className="text-gray-200">Requesting a demo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="signup" id="signup" />
                    <Label htmlFor="signup" className="text-gray-200">Signing up for the product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contact" id="contact" />
                    <Label htmlFor="contact" className="text-gray-200">General inquiry</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-200">Message</Label>
                <Textarea id="message" placeholder="Tell us about your needs or questions" className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" />
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">Submit</Button>
            </form>
          </CardContent>
        </Card>
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