import { useEffect, useState } from 'react';
import AddComment from './components/AddComment/AddComment';
import Comment from './components/Comment/Comment';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [comments, setComments] = useState({});

  useEffect(() => {
    const tempComments = localStorage.getItem('comment-data');
    try {
      const comments = JSON.parse(tempComments);
      setComments({ ...comments });
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    if (Object.keys(comments).length > 0) {
      localStorage.setItem('comment-data', JSON.stringify(comments));
    }
  }, [comments])

  const onCommentAdd = (commentText, parentId, commentId) => {
    if (commentId) {
      const tempComments = { ...comments };
      tempComments[commentId].text = commentText;
      tempComments[commentId].updatedAt = new Date();
      setComments({ ...tempComments });
    }
    else {
      const id = uuidv4();
      const commentObj = {
        id,
        parent: parentId || null,
        text: commentText,
        createdAt: new Date(),
      }
      setComments({ ...comments, [id]: commentObj });
    }

  }

  const deleteComment = (commentId) => {
    const tempComments = { ...comments };
    Object.values(tempComments).map(it => {
      if (it.parent === commentId) {
        delete tempComments[it.id];
      }
      return;
    });
    delete tempComments[commentId];
    setComments({ ...tempComments });
  }

  console.log('Comment', comments)
  return <div>
    <AddComment onCommentAdd={onCommentAdd} />
    <Comment comments={comments} onCommentAdd={onCommentAdd} depth={1} deleteComment={deleteComment} />
  </div>
}

export default App;
