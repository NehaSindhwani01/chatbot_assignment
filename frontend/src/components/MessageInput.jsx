// // // components/MessageInput.js
// // import { useState } from "react";
// // import { useMutation } from "@apollo/client";
// // import { SEND_MESSAGE } from "../graphql/mutations";

// // export default function MessageInput({ chatId, senderType = "user" }) {
// //   const [content, setContent] = useState("");
// //   const [sendMessage] = useMutation(SEND_MESSAGE);

// //   const handleSend = async () => {
// //     if (!content.trim() || !chatId) return;
    
// //     await sendMessage({ 
// //       variables: { 
// //         chat_id: chatId, 
// //         content,
// //         sender: senderType // Must be either "user" or "bot"
// //       } 
// //     });
// //     setContent("");
// //   };

// //   return (
// //     <div>
// //       <input
// //         type="text"
// //         placeholder="Type your message..."
// //         value={content}
// //         onChange={(e) => setContent(e.target.value)}
// //         onKeyPress={(e) => e.key === 'Enter' && handleSend()}
// //       />
// //       <button onClick={handleSend}>Send</button>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { SEND_MESSAGE } from "../graphql/mutations";

// export default function MessageInput({ chatId, senderType = "user" }) {
//   const [content, setContent] = useState("");
//   const [sendMessage] = useMutation(SEND_MESSAGE);

//   const handleSend = async () => {
//     if (!content.trim() || !chatId) return;
    
//     await sendMessage({ 
//       variables: { 
//         chat_id: chatId, 
//         content,
//         sender: senderType
//       } 
//     });
//     setContent("");
//   };

//   return (
//     <div className="flex space-x-2 p-4 bg-gradient-to-r from-indigo-900 to-purple-800">
//       <input
//         type="text"
//         placeholder="Type your message..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//         className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//       />
//       <button 
//         onClick={handleSend}
//         disabled={!content.trim()}
//         className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//       >
//         Send
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../graphql/mutations";
import useBotResponse from './BotResponse';
import { useUserData } from "@nhost/react";

// export default function MessageInput({ chatId }) {
//   const [messageContent, setMessageContent] = useState("");
//   const [isBotThinking, setIsBotThinking] = useState(false);
//   const user = useUserData();
//   const [sendMessage] = useMutation(SEND_MESSAGE);
//   const { respond } = useBotResponse();

//   const handleSendMessage = async () => {
//     if (!messageContent.trim() || !chatId || !user?.id) return;

//     try {
//       await sendMessage({ 
//         variables: { 
//           content: messageContent,
//           chat_id: chatId,
//           sender: "user"
//         } 
//       });

//       setMessageContent("");
//       setIsBotThinking(true);

//       await respond(chatId, user.id, messageContent);

//     } catch (err) {
//       console.error("Error sending message:", err);
//     } finally {
//       setIsBotThinking(false);
//     }
//   };

//   return (
//     // <div className="flex space-x-2 p-4 bg-gradient-to-r from-indigo-900 to-purple-800">
//     //   <input
//     //     type="text"
//     //     placeholder="Type your message..."
//     //     value={messageContent}
//     //     onChange={(e) => setMessageContent(e.target.value)}
//     //     onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//     //     className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//     //   />
//     //   <button 
//     //     onClick={handleSendMessage}
//     //     disabled={!messageContent.trim() || isBotThinking}
//     //     className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//     //   >
//     //     {isBotThinking ? 'Typing...' : 'Send'}
//     //   </button>
//     // </div>
//     <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-2 md:p-4 bg-gradient-to-r from-indigo-900 to-purple-800">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={messageContent}
//           onChange={(e) => setMessageContent(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//           className="flex-1 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
//         />
//         <button 
//           onClick={handleSendMessage}
//           disabled={!messageContent.trim() || isBotThinking}
//           className="px-4 sm:px-6 py-2 md:py-3 bg-pink-600 hover:bg-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//         >
//           {isBotThinking ? 'Typing...' : 'Send'}
//         </button>
//       </div>

//   );
// }

export default function MessageInput({ chatId }) {
  const [messageContent, setMessageContent] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const user = useUserData();
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { respond } = useBotResponse();

  const handleSendMessage = async () => {
    if (!messageContent.trim() || !chatId || !user?.id) return;

    try {
      await sendMessage({ 
        variables: { 
          content: messageContent,
          chat_id: chatId,
          sender: "user"
        } 
      });

      setMessageContent("");
      setIsBotThinking(true);

      await respond(chatId, user.id, messageContent);

    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsBotThinking(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 p-2 md:p-4 bg-gradient-to-r from-indigo-900 to-purple-800">
      <input
        type="text"
        placeholder="Type your message..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        className="flex-1 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm sm:text-base"
      />
      <button 
        onClick={handleSendMessage}
        disabled={!messageContent.trim() || isBotThinking}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-pink-600 hover:bg-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
      >
        {isBotThinking ? 'Typing...' : 'Send'}
      </button>
    </div>
  );
}