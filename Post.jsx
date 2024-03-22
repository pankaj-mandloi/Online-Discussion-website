import React, { useState } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

function Post(props) {
  const [allComments, setAllComments] = useState([...props.comments]);
  const [commentActive, setCommentActive] = useState(false);
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(props.likes); // Initial like count
  const [isLiked, setIsLiked] = useState(false); // Initial like status

  const handleCommentOnClick = () => {
    setCommentActive(true);
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentPost = async (id) => {
    const POST_COMMENT_URL = `http://127.0.0.1:5000/comment/${id}`;
    await axios.post(POST_COMMENT_URL, {
      text: comment,
      createdBy: props.createdBy,
    });
    setCommentActive(false);
    setAllComments([
      ...allComments,
      {
        text: comment,
        createdBy: props.createdBy,
      },
    ]);
    setComment('');
  };

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
        <span className="text-2xl ml-4 font-bold">{props.createdBy}</span>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <span className="text-lg">{props.text}</span>
      </div>
      <div className="flex justify-end items-center gap-10" style={{ display: !commentActive ? 'flex' : 'none' }}>
        <div className="flex items-center mt-4">
          <button
            className={`flex items-center text-pink-500 hover:text-pink-600 focus:outline-none focus:text-pink-600 ${
              isLiked ? 'text-red-500' : ''
            }`}
            onClick={handleLikeClick}
          >
            <FontAwesomeIcon icon={faHeart} className="mr-1" />
            <span className="ml-1">{likeCount} Likes</span>
          </button>
          <button className="flex items-center ml-4 text-pink-500 hover:text-pink-600 focus:outline-none focus:text-pink-600" onClick={handleCommentOnClick}>
            <FontAwesomeIcon icon={faComment} className="mr-1" />
            <span className="ml-1">{allComments.length} Comments</span>
          </button>
        </div>
      </div>
      <div className="flex justify-around p-4 bg-gray-200" style={{ display: commentActive ? 'block' : 'none' }}>
        <input
          className="border-2 border-black p-2 h-16 w-full text-lg mb-4"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="block bg-blue-500 text-white p-4 rounded-md ml-auto mt-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => handleCommentPost(props.ids)}
        >
          Post
        </button>

        {allComments.map((elem, index) => (
          <Comment key={index} text={elem.text} createdBy={elem.createdBy} />
        ))}
      </div>
    </div>
  );
}

export default Post;
