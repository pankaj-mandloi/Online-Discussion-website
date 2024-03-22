import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [text, setText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.username) {
      navigate('/login');
    } else {
      getPosts();
    }
  }, [location.state, navigate]);

  const handlePostClick = async (username) => {
    const CREATE_POST_URL = 'http://127.0.0.1:5000/create-post';

    const data = {
      text,
      createdBy: username,
    };

    try {
      await axios.post(CREATE_POST_URL, data);
      setText('');
      getPosts();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('You are unauthorized');
      } else {
        alert('Something went wrong!');
      }
    }
  };

  const getPosts = async () => {
    const GET_POSTS_URL = 'http://127.0.0.1:5000/posts';

    try {
      let res = await axios.get(GET_POSTS_URL);
      let posts = res.data.posts;

      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllPosts(posts);
      setFilteredPosts(posts);
      setCurrentPage(1);
    } catch (error) {
      alert('Something went wrong');
    }
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = allPosts.filter((post) => post.text.toLowerCase().includes(lowerCaseQuery));
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-800 to-pink-500 p-4 justify-center">
      <div className="w-3/4 flex flex-col ml-64 justify-center align-center">
        <div className="w-full mx-auto mb-8">
          <div className="flex items-center gap-4">
            <textarea
              className="block border border-purple-400 w-3/4 h-56 rounded-lg p-4 text-lg shadow-md focus:outline-none focus:border-purple-600 bg-white text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Create a Post!"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 focus:outline-none focus:shadow-outline-pink transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handlePostClick(location.state.username)}
            >
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
              Post
            </button>
          </div>
          <div className="mt-2">
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="search"
                className="py-2 text-sm text-white rounded-md pl-8 focus:outline-none focus:bg-white focus:text-gray-900 focus:w-3/4"
                placeholder="Search posts..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {currentPosts.map((elem, index) => (
          <div
            key={elem._id}
            className="bg-white text-gray-800 w-3/4 rounded-lg p-4 mb-4 shadow-md opacity-100 transform scale-100 transition duration-500 ease-in-out delay-100"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Post text={elem.text} like={0} createdBy={elem.createdBy} comments={elem.comments} ids={elem._id} />
          </div>
        ))}

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded-md ${
                currentPage === index + 1 ? 'bg-purple-700 text-white' : 'bg-gray-400 text-gray-800'
              } hover:bg-gray-500 focus:outline-none focus:shadow-outline-purple transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
