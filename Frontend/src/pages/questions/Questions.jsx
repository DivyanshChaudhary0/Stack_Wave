
import React from 'react'
import { ArrowUp, MessageSquare } from "lucide-react";

const Questions = () => {
  return (
    <div className="h-screen flex p-4 gap-6 overflow-hidden relative">
  <aside className="hidden md:block w-64 fixed left-0 h-screen p-4 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
    <h3 className="font-bold text-lg">Popular Tags</h3>
    <ul className="mt-2 space-y-2">
      {["JavaScript", "React", "Node.js", "MongoDB", "CSS", "Next.js"].map(tag => (
        <li key={tag} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer">{tag}</li>
      ))}
    </ul>
  </aside>

  <main className="flex-1 pl-64 min-h-full pr-4">
    <h2 className="text-2xl font-bold mb-4">Latest Questions</h2>
    <div className="space-y-4">
      {[1, 2, 3,4,  ].map((q) => (
        <div key={q} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 hover:shadow-xl transition flex gap-4">
          <div className="flex flex-col items-center">
            <ArrowUp className="text-gray-600 dark:text-gray-300 cursor-pointer hover:scale-125 transition-transform" />
            <span className="font-bold text-lg">15</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">How to optimize React performance?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Asked by John Doe • 2 hours ago</p>
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 bg-blue-500 text-white rounded-lg">React</span>
              <span className="px-2 py-1 bg-gray-500 text-white rounded-lg">Performance</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <MessageSquare className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm">5 Answers</span>
          </div>
        </div>
      ))}
    </div>
  </main>
</div>

  )
}

export default Questions