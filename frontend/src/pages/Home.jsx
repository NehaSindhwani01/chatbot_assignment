// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import Chat from "./Chat";
import { graphQLClient } from "../App";
import { GET_CHATS } from "../graphql/queries";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      const data = await graphQLClient.request(GET_CHATS);
      setChats(data.chats);
    };
    fetchChats();
  }, []);

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} selectChat={setSelectedChat} />
      {selectedChat ? <Chat chat={selectedChat} /> : <div className="flex-1 flex items-center justify-center">Select a chat</div>}
    </div>
  );
}
