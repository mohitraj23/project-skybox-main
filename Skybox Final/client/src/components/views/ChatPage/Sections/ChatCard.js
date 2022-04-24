import React from "react";
import { Comment, Avatar } from 'antd';

function ChatCard(props) {
    console.log("Props is",props)
    return (
        <div style={{ width: '100%' }}>
            
            <Comment
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                        <p>
                            {props.message}
                        </p>
                }
            />
        </div>
    )
}

export default ChatCard;
