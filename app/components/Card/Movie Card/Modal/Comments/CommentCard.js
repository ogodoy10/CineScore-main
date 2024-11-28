import React, { useState, useRef } from "react";
import styles from "./CommentCard.module.css";

const CommentCard = ({ user, content, time, rating, replies, isReply = false }) => {
    const [reply, setReply] = useState(""); // Estado para a resposta do comentário
    const [isReplying, setIsReplying] = useState(false); // Para controlar o estado de digitação
    const replyInputRef = useRef(null); // Referência para o input de resposta

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleReplyKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (reply.trim() !== "") {
                console.log("Resposta enviada:", reply); // Simule o envio
                setReply(""); // Limpa o input após enviar
                setIsReplying(false); // Sai do modo de digitação
            }
        }
    };

    const handleReplyClick = () => {
        setIsReplying(true);
        setTimeout(() => {
            replyInputRef.current?.focus(); // Garante o foco no input
        }, 0);
    };

    const handleReplyBlur = () => {
        if (!reply.trim()) setIsReplying(false); // Sai do modo de digitação se vazio
    };

    return (
        <div className={`${styles.commentCard} ${isReply ? styles.replyCard : ""}`}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}></div>
                    <div>
                        <strong>{user}</strong>
                        <span className={styles.time}>{time}</span>
                    </div>
                </div>
                {rating && <div className={styles.rating}>{"★".repeat(rating)}</div>}
            </div>
            <p className={styles.content}>{content}</p>
            {!isReply && ( // Apenas para comentários principais
                <div className={styles.replySection}>
                    {!isReplying && (
                        <span
                            className={styles.replyTrigger}
                            onClick={handleReplyClick}
                        >
                            Responder
                        </span>
                    )}
                    {isReplying && (
                        <textarea
                            ref={replyInputRef} // Define a referência
                            className={styles.replyInput}
                            rows="1"
                            placeholder="Responder"
                            value={reply}
                            onChange={handleReplyChange}
                            onKeyDown={handleReplyKeyDown}
                            onBlur={handleReplyBlur}
                        ></textarea>
                    )}
                </div>
            )}
            {replies && (
                <div className={styles.replies}>
                    {replies.map((reply, index) => (
                        <CommentCard
                            key={index}
                            user={reply.user}
                            content={reply.content}
                            time={reply.time}
                            rating={reply.rating}
                            isReply={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
