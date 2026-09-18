import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
        Next-Generation <span className="text-indigo-600">AI Platform</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Generate professional articles, stunning images, and analyze resumes instantly using advanced AI tools built for productivity.
      </p>
      <div className="flex gap-4">
        <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
          Get Started
        </Link>
        <Link to="/login" className="bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-sm hover:shadow">
          Sign In
        </Link>
      </div>
    </div>
  )
}
