// import { useSubscription } from "@apollo/client";
// import { MESSAGES_SUBSCRIPTION } from "../graphql/subscriptions";

// export default function MessageView({ chatId }) {
//   const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
//     variables: { chat_id: chatId },
//     skip: !chatId,
//   });

//   if (!chatId) return <p>Select a chat to view messages.</p>;
//   if (loading) return <p>Loading messages...</p>;
//   if (error) return <p>Error loading messages: {error.message}</p>;

//   return (
//     <div className="messages-container">
//       {data?.messages.map((msg) => (
//         <div 
//           key={msg.id} 
//           className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
//         >
//           <strong>{msg.sender}:</strong> {msg.content}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useSubscription } from "@apollo/client";
import { MESSAGES_SUBSCRIPTION } from "../graphql/subscriptions";

// export default function MessageView({ chatId }) {
//   const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
//     variables: { chat_id: chatId },
//     skip: !chatId,
//   });

//   if (!chatId) return (
//     <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <p className="text-white text-opacity-80">Select a chat to view messages</p>
//     </div>
//   );
  
//   if (loading) return (
//     <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="text-white text-opacity-80">Loading messages...</div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="bg-red-400 bg-opacity-20 p-4 rounded-xl text-red-100 text-center">
//         Error loading messages: {error.message}
//       </div>
//     </div>
//   );

//   return (
//     // <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//     //   <div className="space-y-4">
//     //     {data?.messages.map((msg) => (
//     //       <div 
//     //         key={msg.id} 
//     //         className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
//     //       >
//     //         <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.sender === 'bot' ? 'bg-white bg-opacity-10 text-white' : 'bg-indigo-600 text-white'}`}>
//     //           <strong className="block text-xs opacity-70 mb-1">{msg.sender}</strong>
//     //           {msg.content}
//     //         </div>
//     //       </div>
//     //     ))}
//     //   </div>
//     // </div>
//     <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
//       <div className="space-y-2 md:space-y-4">
//         {data?.messages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
//           >
//             <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 md:py-3 rounded-2xl ${msg.sender === 'bot' ? 'bg-white bg-opacity-10 text-white' : 'bg-indigo-600 text-white'}`}>
//               <strong className="block text-xs opacity-70 mb-1">{msg.sender}</strong>
//               {msg.content}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// }

export default function MessageView({ chatId }) {
  const { data, loading, error } = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: { chat_id: chatId },
    skip: !chatId,
  });

  if (!chatId) return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <p className="text-white text-opacity-80 text-sm sm:text-base">Select a chat to view messages</p>
    </div>
  );
  
  if (loading) return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="text-white text-opacity-80 text-sm sm:text-base">Loading messages...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="bg-red-400 bg-opacity-20 p-3 sm:p-4 rounded-xl text-red-100 text-center text-sm sm:text-base">
        Error loading messages: {error.message}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {data?.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[70%] sm:max-w-xs md:max-w-md lg:max-w-lg px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base ${
              msg.sender === 'bot' 
                ? 'bg-white bg-opacity-10 text-white' 
                : 'bg-indigo-600 text-white'
            }`}>
              <strong className="block text-xs opacity-70 mb-1">{msg.sender}</strong>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}