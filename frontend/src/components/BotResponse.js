// import { useMutation } from "@apollo/client";
// import { SEND_MESSAGE } from "../graphql/mutations";

// export default function useBotResponse() {
//   const [sendBotMessage] = useMutation(SEND_MESSAGE);

//   const respond = async (chatId, userId, userMessage) => {
//     console.log('=== BOT RESPONSE INITIATED ===', { 
//       chatId, 
//       userId, 
//       userMessage,
//       timestamp: new Date().toISOString() 
//     });

//     try {
//       // 1. WEBHOOK CALL
//       console.log('[1/4] Initiating webhook call...');
//       const controller = new AbortController();
//       const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout

//       const response = await fetch('http://localhost:5678/webhook/send-message', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // If needed
//         },
//         body: JSON.stringify({
//           chat_id: chatId,
//           user_id: userId,
//           content: userMessage,
//           timestamp: new Date().toISOString()
//         }),
//         signal: controller.signal
//       });
//       clearTimeout(timeout);

//       console.log('[2/4] Webhook response received', {
//         status: response.status,
//         headers: Object.fromEntries(response.headers.entries())
//       });

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('Webhook error details:', errorData);
//         throw new Error(`Webhook responded with ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('[3/4] Webhook data:', data);

//       if (!data?.reply) {
//         throw new Error('Invalid response format - missing reply field');
//       }

//       // 2. SEND BOT MESSAGE
//       console.log('[4/4] Sending bot message to GraphQL...');
//       const result = await sendBotMessage({
//         variables: {
//             chat_id: chatId,
//             content: data.reply,
//             sender: "bot"
//         },
//         fetchPolicy: "no-cache"  // <-- prevents Apollo from caching it
//         });


//       console.log('Bot message successfully stored:', result.data?.insert_messages_one?.id);
//       return result.data;

//     } catch (error) {
//       console.error('!!! FULL BOT RESPONSE FAILURE !!!', {
//         error: error.message,
//         stack: error.stack,
//         time: new Date().toISOString()
//       });

//       // Emergency fallback
//       try {
//         await sendBotMessage({
//           variables: {
//             chat_id: chatId,
//             content: "I'm having some technical difficulties. Please try again later.",
//             sender: "bot"
//           }
//         });
//       } catch (fallbackError) {
//         console.error('!!! FALLBACK MESSAGE ALSO FAILED !!!', fallbackError);
//       }

//       throw error;
//     }
//   };

//   return { respond };
// }

import { useState } from "react";

export default function useBotResponse() {

  const respond = async (chatId, userId, userMessage) => {
    console.log('=== BOT RESPONSE INITIATED ===', { 
      chatId, 
      userId, 
      userMessage,
      timestamp: new Date().toISOString() 
    });

    try {
      // 1. Call the webhook
      console.log('[1/3] Initiating webhook call...');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch('https://n8n-service-xk89.onrender.com/webhook/send-message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // if your webhook requires auth
        },
        body: JSON.stringify({
          chat_id: chatId,
          user_id: userId,
          content: userMessage,
          timestamp: new Date().toISOString()
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);
      console.log('[2/3] Webhook response received:', { status: response.status });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Webhook error details:', errorData);
        throw new Error(`Webhook responded with ${response.status}`);
      }

      const data = await response.json();
      console.log('[3/3] Webhook data:', data);

      if (!data?.reply) {
        throw new Error('Invalid response format - missing reply field');
      }

      // ✅ No need to call sendBotMessage mutation here
      // The webhook already saved the bot message

      return data.reply;

    } catch (error) {
      console.error('!!! BOT RESPONSE FAILURE !!!', error);

      // Optional fallback
      return "I'm having some technical difficulties. Please try again later.";
    }
  };

  return { respond };
}
