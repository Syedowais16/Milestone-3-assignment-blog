import { useRouter } from "next/router";
import blogs from "../../data/blogs";
import CommentSection from "../../components/CommentSection";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <p className="text-center mt-6 text-red-500">Blog not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Owais Awesome Blog</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <Link href="/" className="text-blue-500 hover:underline">← Back to Home</Link>

        <h1 className="text-4xl font-extrabold text-gray-800 mt-4">{blog.title}</h1>
        <p className="text-gray-500 text-sm mt-1">Published on {blog.date}</p>

        <div className="mt-6">
          <img 
            src={blog.image || "/nextjs.jpg"} 
            alt={blog.title} 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        <p className="mt-6 text-lg text-gray-700 leading-relaxed">{blog.content}</p>
        <CommentSection />
      </main>

      <footer className="bg-gray-900 text-white text-center py-4 mt-10">
        <p>© {new Date().getFullYear()} Owais Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
