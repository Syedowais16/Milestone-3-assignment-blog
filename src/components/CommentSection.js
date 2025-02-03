import { useState, useEffect } from "react";

export default function CommentSection() {
  // Initialize state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch comments from localStorage on component mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments"));
    if (savedComments) {
      setComments(savedComments);
    }
  }, []);

  // Update localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  // Add or update a comment
  const addComment = () => {
    if (newComment.trim() === "") return;
    if (editingIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[editingIndex] = newComment;
      setComments(updatedComments);
      setEditingIndex(null);
    } else {
      setComments([...comments, newComment]);
    }
    setNewComment("");
  };

  // Delete a comment
  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  // Edit a comment
  const editComment = (index) => {
    setNewComment(comments[index]);
    setEditingIndex(index);
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800">Comments</h2>

      <ul className="mt-4 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
            >
              <span className="text-gray-900">{comment}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editComment(index)}
                  className="text-white bg-blue-500 px-3 py-1 rounded-md font-semibold transition duration-300 hover:bg-blue-700 shadow-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteComment(index)}
                  className="text-white bg-red-500 px-3 py-1 rounded-md font-semibold transition duration-300 hover:bg-red-700 shadow-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={addComment}
          className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition duration-300"
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}
