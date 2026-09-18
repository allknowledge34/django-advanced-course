import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ArticleGenerator from './pages/ArticleGenerator'
import ImageGenerator from './pages/ImageGenerator'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/article-generator" element={<ArticleGenerator />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
