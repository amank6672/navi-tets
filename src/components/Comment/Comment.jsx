import React, { useState } from "react";


const Comment = ({ comments, onCommentAdd, parentId, depth, deleteComment }) => {
    const rootLevelComments = Object.values(comments).filter(it => parentId ? it.parent === parentId : !it.parent);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [onEdit, setOnEdit] = useState(false);

    const onCommentSave = (comment) => {
        onCommentAdd(commentText, comment.parent, comment.id);
        setOnEdit(false);
        setCommentText('');
    }

    const onCommentReply = (parentId) => {
        onCommentAdd(commentText, parentId);
        setShowReplyInput(false);
        setCommentText('');
    }

    return <div className="comments-wrapper">
        {
            rootLevelComments.map(comment => {
                return <div key={comment.id} style={{
                    margin: 10,
                    marginLeft: `${depth * 5}px`,
                }}>
                    {
                        <div>
                            {
                                onEdit ?
                                    <>
                                        <input type="text" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
                                        <button
                                            onClick={() => {
                                                setOnEdit(false);
                                                setCommentText('');
                                            }}
                                        >Cancel</button>
                                    </>
                                    :
                                    <>
                                        <div>{comment.text}</div>
                                        <div>Created At: {new Date(comment.createdAt).toLocaleString()}</div>
                                        {
                                            comment.updatedAt &&
                                            <div>Updated At: {new Date(comment.updatedAt).toLocaleString()}</div>
                                        }
                                    </>
                            }
                            <div>
                                {
                                    !onEdit ?
                                        <button onClick={() => {
                                            setCommentText(comment.text);
                                            setOnEdit(true);
                                        }}
                                        >EDIT</button>
                                        :
                                        <button onClick={() => {
                                            onCommentSave(comment);
                                        }}>Save</button>
                                }
                                <button onClick={() => {
                                    deleteComment(comment.id)
                                }}>Delete</button>
                                {
                                    !showReplyInput && <button
                                        onClick={() => setShowReplyInput(true)}
                                    >Reply</button>
                                }
                            </div>
                            {
                                showReplyInput &&
                                <>
                                    <input type="text" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
                                    <button onClick={() => {
                                        onCommentReply(comment.id);
                                    }}>Reply</button>
                                </>
                            }
                            <div className="children">
                                <Comment comments={comments} onCommentAdd={onCommentAdd} parentId={comment.id} depth={depth + 1} deleteComment={deleteComment} />
                            </div>
                        </div>
                    }
                </div>
            })
        }
    </div>;
}

export default Comment;