import React from 'react'
import "./Chatbox.css"
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer , MessageList , Message , MessageInput , TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

const GROQ_API_KEY = "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";

const systemMessage = {
    role: "system",
    content: "You are a chatbot working under machines which is a e-commerce platform that sells gadgets such as smartphones , gaming consoles, headphones , laptops and smartwatches only. Act as a friendly yet professional AI assistant towards the customer and only respond in only questions related to gadgets."
};

const Chat = () => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am your AI assistant",
            sender: "GROQ"
        }
    ]);

    const handleMessage = async (message) => {
        const userMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        };
        
        //newMessages = past message + user's message
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setTyping(true);

       //try catch //
        try {
            const responseData = await processMessage(newMessages);
            const assistantMessage = {
                message: responseData.choices[0].message.content,
                sender: "GROQ"
            };
            setMessages([...newMessages, assistantMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
        }

        setTyping(false);
    };
    
    //construct the API request body//
    const processMessage = async (chatMessages) => {
        const apiMessages = chatMessages.map((messageObject) => ({
            role: messageObject.sender === "GROQ" ? "assistant" : "user",
            content: messageObject.message
        }));

        const apiRequestBody = {
            messages: [systemMessage, ...apiMessages],
            model: "mixtral-8x7b-32768"
        };

        //initilize response//
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });
        if(!response.ok) {
            throw new Error('Fetch Error')
        }
        return response.json();
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
};

export default Chat;
