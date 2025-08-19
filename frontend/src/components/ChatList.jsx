// import { useSubscription, useMutation } from "@apollo/client";
// import { CHATS_SUBSCRIPTION } from "../graphql/subscriptions";
// import { SEND_MESSAGE, CREATE_CHAT } from "../graphql/mutations";
// import { useState, useEffect } from "react";
// import { useUserData } from "@nhost/react";
// import useBotResponse from './BotResponse';

// export default function ChatList({ onSelectChat, selectedChatId }) {
//   console.log("ChatList rendered", { selectedChatId });
//   const user = useUserData();
//   const { data, loading, error } = useSubscription(CHATS_SUBSCRIPTION, {
//     variables: { user_id: user?.id }
//   });
//   const [createChat] = useMutation(CREATE_CHAT);
//   const [sendMessage] = useMutation(SEND_MESSAGE);
//   const [messageContent, setMessageContent] = useState("");
//   const [chatName, setChatName] = useState("");
//   const { respond } = useBotResponse();
//   const [isBotThinking, setIsBotThinking] = useState(false);

//   const handleSendMessage = async () => {
//     console.log('Send button clicked!', { messageContent, selectedChatId });
//     if (!messageContent.trim() || !selectedChatId || !user?.id) return;

//     try {
//       console.log('Sending message...');
//       const userMsgRes = await sendMessage({ 
//         variables: { 
//           content: messageContent,
//           chat_id: selectedChatId,
//           sender: "user"
//         } 
//       });
//       console.log('Message sent:', userMsgRes.data);

//       setMessageContent("");
//       setIsBotThinking(true);

//       console.log('Getting bot response...');
//       await respond(selectedChatId, user.id, messageContent);
//       console.log('Bot response completed');
      
//     } catch (err) {
//       console.error("Error in handleSendMessage:", err);
//     } finally {
//       setIsBotThinking(false);
//     }
//   };

//   const handleCreateChat = async () => {
//     if (!chatName.trim() || !user?.id) return;
//     await createChat({ 
//       variables: { 
//         title: chatName,
//         user_id: user.id
//       } 
//     });
//     setChatName("");
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-full">
//       <div className="text-white text-opacity-80">Loading chats...</div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="bg-red-400 bg-opacity-20 p-4 rounded-xl text-red-100 text-center">
//       Error loading chats: {error.message}
//     </div>
//   );

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 text-white">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Your Chats</h2>
        
//         <div className="flex mb-4 space-x-2">
//           <input
//             type="text"
//             placeholder="New chat name"
//             value={chatName}
//             onChange={(e) => setChatName(e.target.value)}
//             className="flex-1 px-4 py-2 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//           />
//           <button 
//             onClick={handleCreateChat}
//             disabled={!chatName.trim()}
//             className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//           >
//             Create
//           </button>
//         </div>

//         <ul className="space-y-2 max-h-60 overflow-y-auto">
//           {data?.chats.map((chat) => (
//             <li 
//               key={chat.id} 
//               onClick={() => onSelectChat(chat.id)}
//               className={`p-3 rounded-xl cursor-pointer transition-all ${chat.id === selectedChatId ? 'bg-white bg-opacity-20 font-medium' : 'hover:bg-white hover:bg-opacity-10'}`}
//             >
//               {chat.title}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedChatId && (
//         <div className="mt-auto">
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={messageContent}
//               onChange={(e) => setMessageContent(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//             />
//             <button 
//               onClick={handleSendMessage}
//               disabled={!messageContent.trim() || isBotThinking}
//               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
//             >
//               {isBotThinking ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Typing...
//                 </>
//               ) : 'Send'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useSubscription, useMutation } from "@apollo/client";
import { CREATE_CHAT, DELETE_CHAT } from "../graphql/mutations";
import { CHATS_SUBSCRIPTION } from "../graphql/subscriptions";
import { useState } from "react";
import { useUserData } from "@nhost/react";
import MessageInput from './MessageInput';

// export default function ChatList({ onSelectChat, selectedChatId }) {
//   const user = useUserData();
//   const { data, loading, error } = useSubscription(CHATS_SUBSCRIPTION, {
//     variables: { user_id: user?.id }
//   });

//   const [createChat] = useMutation(CREATE_CHAT);
//   const [chatName, setChatName] = useState("");
//   const [deleteChat] = useMutation(DELETE_CHAT);
//   const [hoveredChat, setHoveredChat] = useState(null);

//   const handleCreateChat = async () => {
//     if (!chatName.trim() || !user?.id) return;
//     await createChat({ 
//       variables: { title: chatName, user_id: user.id } 
//     });
//     setChatName("");
//   };

//   const handleDeleteChat = async (chatId, e) => {
//     e.stopPropagation();
//     if (confirm("Are you sure you want to delete this chat?")) {
//       await deleteChat({ variables: { chat_id: chatId } });
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="text-white text-opacity-80 animate-pulse">Loading your chats...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="bg-red-400 bg-opacity-20 p-4 rounded-xl text-red-100 text-center max-w-md">
//         Error loading chats: {error.message}
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 md:p-6 text-white">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">
//           Your Chats
//         </h2>
//         <p className="text-white text-opacity-70">Select or create a conversation</p>
//       </div>

//       {/* Create Chat Section */}
//       <div className="flex mb-6 space-x-3">
//         <input
//           type="text"
//           placeholder="Enter chat name..."
//           value={chatName}
//           onChange={(e) => setChatName(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-200"
//         />
//         <button
//           onClick={handleCreateChat}
//           disabled={!chatName.trim()}
//           className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//           </svg>
//           New Chat
//         </button>
//       </div>

//       {/* Chat List */}
//       <div className="flex-1 overflow-hidden">
//         <ul className="space-y-2 h-full overflow-y-auto pr-2 custom-scrollbar">
//           {data?.chats.map(chat => (
//             <li 
//               key={chat.id} 
//               onClick={() => onSelectChat(chat.id)}
//               onMouseEnter={() => setHoveredChat(chat.id)}
//               onMouseLeave={() => setHoveredChat(null)}
//               className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 ${
//                 chat.id === selectedChatId 
//                   ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-400/30 shadow-lg' 
//                   : 'hover:bg-white/10 border border-transparent hover:border-white/10'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className={`w-3 h-3 rounded-full mr-3 ${
//                     chat.id === selectedChatId ? 'bg-pink-400' : 'bg-white/30'
//                   }`} />
//                   <span className="font-medium truncate">{chat.title}</span>
//                 </div>
                
//                 {/* Enhanced Delete Button */}
//                 <button 
//                   onClick={(e) => handleDeleteChat(chat.id, e)}
//                   className={`p-1.5 rounded-full transition-all duration-200 ${
//                     hoveredChat === chat.id || chat.id === selectedChatId
//                       ? 'opacity-100 bg-white/10 hover:bg-white/20 text-red-400 hover:text-red-300'
//                       : 'opacity-0 group-hover:opacity-100'
//                   }`}
//                   title="Delete Chat"
//                 >
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     viewBox="0 0 20 20" 
//                     fill="currentColor"
//                   >
//                     <path 
//                       fillRule="evenodd" 
//                       d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
//                       clipRule="evenodd" 
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }


export default function ChatList({ onSelectChat, selectedChatId }) {
  const user = useUserData();
  const { data, loading, error } = useSubscription(CHATS_SUBSCRIPTION, {
    variables: { user_id: user?.id }
  });

  const [createChat] = useMutation(CREATE_CHAT);
  const [chatName, setChatName] = useState("");
  const [deleteChat] = useMutation(DELETE_CHAT);
  const [hoveredChat, setHoveredChat] = useState(null);

  const handleCreateChat = async () => {
    if (!chatName.trim() || !user?.id) return;
    await createChat({ 
      variables: { title: chatName, user_id: user.id } 
    });
    setChatName("");
  };

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      await deleteChat({ variables: { chat_id: chatId } });
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="text-white text-opacity-80 animate-pulse text-sm sm:text-base">Loading your chats...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="bg-red-400 bg-opacity-20 p-3 sm:p-4 rounded-xl text-red-100 text-center max-w-xs sm:max-w-md text-sm sm:text-base">
        Error loading chats: {error.message}
      </div>
    </div>
  );

   return (
  <div className="flex flex-col h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-2 md:p-3 lg:p-4 text-white overflow-hidden">
    {/* Header with responsive text sizing */}
    <div className="mb-3 md:mb-4 lg:mb-6 px-1">
      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">
        Your Chats
      </h2>
      <p className="text-white text-opacity-70 text-xs md:text-sm">Select or create a conversation</p>
    </div>

    {/* Create Chat Section - fixed for all screen sizes */}
{/* Create Chat Section - fully responsive */}
<div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4 px-1">
  <input
    type="text"
    placeholder="Enter chat name..."
    value={chatName}
    onChange={(e) => setChatName(e.target.value)}
    className="flex-grow min-w-[180px] px-3 py-2 rounded-lg md:rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 text-sm md:text-base"
  />
  <button
    onClick={handleCreateChat}
    disabled={!chatName.trim()}
    className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg md:rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm md:text-base min-w-[100px]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
    New Chat
  </button>
</div>



    {/* Chat List with proper scroll containment */}
    <div className="flex-1 overflow-hidden">
      <ul className="h-full overflow-y-auto pr-1 custom-scrollbar space-y-1 md:space-y-2">
        {data?.chats.map(chat => (
          <li 
            key={chat.id} 
            onClick={() => onSelectChat(chat.id)}
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
            className={`group relative p-2 md:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              chat.id === selectedChatId 
                ? 'bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-400/30 shadow-md' 
                : 'hover:bg-white/10 border border-transparent hover:border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full mr-2 md:mr-3 flex-shrink-0 ${
                  chat.id === selectedChatId ? 'bg-pink-400' : 'bg-white/30'
                }`} />
                <span className="font-medium truncate text-sm md:text-base">{chat.title}</span>
              </div>
              
              <button 
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className={`p-1 md:p-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                  hoveredChat === chat.id || chat.id === selectedChatId
                    ? 'opacity-100 bg-white/10 hover:bg-white/20 text-red-400 hover:text-red-300'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                title="Delete Chat"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 md:h-5 md:w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>

  );
}