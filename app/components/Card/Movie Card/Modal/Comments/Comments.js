import React, { useState } from "react";
import CommentCard from "./CommentCard";
import styles from "./Comments.module.css";

const Comments = () => {
    const [newComment, setNewComment] = useState("");
    const [commentList, setCommentList] = useState([
        {
            id: 1,
            user: "Nome Usuário 1",
            content: "Incrível! A atuação foi excelente, e a história emocionou do início ao fim. Recomendo!",
            rating: 5,
            timeAgo: "há 3 dias",
            replies: [
                {
                    id: 3,
                    user: "Nome Usuário 3",
                    content: "Discordo completamente",
                    timeAgo: "há 2 dias",
                },
            ],
        },
        {
            id: 2,
            user: "Nome Usuário 2",
            content: "A atuação foi boa, mas o final deixou um pouco a desejar. 😔",
            rating: 3,
            timeAgo: "há 1 dia",
            replies: [],
        },
    ]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (newComment.trim() !== "") {
                const newId = commentList.length + 1;
                const updatedComments = [
                    ...commentList,
                    {
                        id: newId,
                        user: "Você",
                        content: newComment.trim(),
                        rating: null,
                        timeAgo: "agora",
                        replies: [],
                    },
                ];
                setCommentList(updatedComments);
                setNewComment("");
            }
        }
    };

    return (
        <div className={styles.commentSection}>
            <h2>Comentários</h2>
            <div className={styles.commentsList}>
                {commentList.map((comment) => (
                    <div key={comment.id}>
                        <CommentCard
                            user={comment.user}
                            content={comment.content}
                            rating={comment.rating}
                            timeAgo={comment.timeAgo}
                        />
                        {comment.replies &&
                            comment.replies.map((reply) => (
                                <CommentCard
                                    key={reply.id}
                                    user={reply.user}
                                    content={reply.content}
                                    timeAgo={reply.timeAgo}
                                    isReply={true}
                                />
                            ))}
                    </div>
                ))}
            </div>
            <div className={styles.commentInput}>
                <textarea
                    rows="1"
                    placeholder="Adicione um comentário..."
                    value={newComment}
                    onChange={handleCommentChange}
                    onKeyDown={handleKeyDown}
                ></textarea>
            </div>
        </div>
    );
};

export default Comments;
