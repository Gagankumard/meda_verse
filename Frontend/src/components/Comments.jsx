import axios from "axios";
import React, { useEffect, useState } from "react";

function Comments({ id }) {
  const [comments, setComments] = useState();
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`/api/v1/comments/getAllComents/${id}`);
        if (res.status === 200) {
          setComments(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    getComments();
  }, []);
  console.log(comments);
  return (
    <div className="text-white">
      <ul>
        {comments &&
          comments.map((comment) => (
            <li key={comment?._id}>{comment?.content}</li>
          ))}
      </ul>
    </div>
  );
}

export default Comments;
