import React from 'react'
import { Button } from 'react-bootstrap'


const LikeButton = ({ articleId, handleLike }) => {

    const handleClick = () => {
        handleLike(articleId);
    };
    
    return (
        <Button onClick={handleClick}>
            Like
        </Button>
    )
}

export default LikeButton