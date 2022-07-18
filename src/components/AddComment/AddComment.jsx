import React, { useState } from "react";


const AddComment = ({ onCommentAdd }) => {

    const [comment, setComment] = useState('');

    return <div>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button
            disabled={!comment}
            onClick={() => {
                onCommentAdd(comment);
                setComment('');
            }}
        >ADD COMMENT</button>
    </div>
}

export default AddComment;