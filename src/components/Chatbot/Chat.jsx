import React from 'react'
import "./Chatbox.css"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer , MessageList , Message , MessageInput , TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

const GROQ_API_KEY = "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"

const systemMessages = {
    role : "system",
    content: "Act as a friendly yet professional customer service chatbot to assist the user"
}

const Chat = () => {
     const [typing , setTyping] = useState(false);
     const [messages , setMessages] = useState([
        {
            message : "Hello , I am your AI assistant",
            sender: "GROQ"
        }
     ])

     const handleMessage = async(message) => {
        const usernewMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, usernewMessage];
        setMessages(newMessages)

        setTyping(true);
        await processsMessage(newMessages)
     };

     async function processsMessage(chatMessages){
        //apiMessages
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if(messageObject.sender === "GROQ") {
                role = "assistant"
            } else {
                role = "user"
            }
            return {role : role , content : messageObject.message};
        });

      
        const apiRequestBody = {
            "messages": [
                systemMessages,
                ...apiMessages
            ],
            "model" : "mixtral-8x7b-32768"
        }

        await fetch("https://api.groq.com/openai/v1/chat/completions" , {
            method: "POST",
            headers: {
                "Authorization" : "Bearer" + GROQ_API_KEY,
                "Content-Type": "application/json"
           },
           body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then((data) => {
            setMessages(
                [...chatMessages , {
                    message: data.choices[0].message.content,
                    sender: "GROQ"
                }]
            );
            setTyping(false);
        })
     }

  return (
    <div className='chatbot'>
        <div className='chat'>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                    typingIndicator={typing? <TypingIndicator content="Bot is typing"></TypingIndicator> : null}>
                        {messages.map((message , i) => {
                            return <Message key={i} model={message}></Message>
                        })}
                    </MessageList>
                    <MessageInput placeholder='Send Something' onSend={handleMessage}></MessageInput>
                </ChatContainer>
            </MainContainer>
        </div>
    </div>
  )
}

export default Chat