import React from 'react';
import { BookOpen, Link as LinkIcon, Youtube, FileText } from 'lucide-react';

const resources = [
  {
    title: 'Understanding Addiction',
    description: 'Learn about the science behind addiction and how it affects the brain.',
    link: 'https://www.healthline.com/health/addiction/recognizing-addiction',
    icon: FileText
  },
  {
    title: 'Mindfulness Techniques',
    description: 'Discover powerful mindfulness practices for managing urges and staying focused.',
    link: 'https://www.headspace.com/mindfulness',
    icon: Youtube
  },
  {
    title: 'Building Better Habits',
    description: 'A comprehensive guide to forming positive habits and breaking negative ones.',
    link: 'https://jamesclear.com/habits',
    icon: LinkIcon
  },
  {
    title: 'Recovery Success Stories',
    description: 'Read inspiring stories from people who have overcome similar challenges.',
    link: 'https://www.reddit.com/r/NoFap/top/?t=all',
    icon: BookOpen
  }
];

function Resources() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="text-blue-700" />
          Educational Resources
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <resource.icon className="text-blue-700" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Daily Inspiration</h2>
        <div className="bg-blue-50 border-l-4 border-blue-700 p-4">
          <p className="text-lg font-medium text-blue-900">
            "The only person you are destined to become is the person you decide to be."
          </p>
          <p className="text-blue-700 mt-2">― Ralph Waldo Emerson</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="bg-green-100 rounded-full p-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p>Exercise regularly to reduce stress and improve mood</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-100 rounded-full p-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p>Practice meditation to strengthen self-control</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-100 rounded-full p-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p>Keep a journal to track triggers and progress</p>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-green-100 rounded-full p-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p>Stay connected with supportive friends and family</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Resources