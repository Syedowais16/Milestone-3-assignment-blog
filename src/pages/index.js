import Link from "next/link";
import blogs from "../data/blogs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center">Welcome to Owais Blog</h1>
        <p className="text-center text-lg mt-2">Explore insightful articles on various trending topics</p>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(({ id, title, date, image }) => (
            <div 
              key={id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img src={image || "/nextjs.jpg"} alt={title} className="w-full h-48 object-cover"/>

              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-500 text-sm mt-1">Published on {date}</p>
                <Link 
                  href={`/posts/${id}`} 
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4 mt-10">
        <p>© {new Date().getFullYear()} Owais Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
