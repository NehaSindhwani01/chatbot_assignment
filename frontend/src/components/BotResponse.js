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

// import { useState } from "react";

// export default function useBotResponse() {

//   const respond = async (chatId, userId, userMessage) => {
//     console.log('=== BOT RESPONSE INITIATED ===', { 
//       chatId, 
//       userId, 
//       userMessage,
//       timestamp: new Date().toISOString() 
//     });

//     try {
//       // 1. Call the webhook
//       console.log('[1/3] Initiating webhook call...');
//       const controller = new AbortController();
//       const timeout = setTimeout(() => controller.abort(), 20000); // 10-second timeout

//       const response = await fetch('https://n8n-service-xk89.onrender.com/webhook/send-message', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // if your webhook requires auth
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
//       console.log('[2/3] Webhook response received:', { status: response.status });

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error('Webhook error details:', errorData);
//         throw new Error(`Webhook responded with ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('[3/3] Webhook data:', data);


      
//       // let data;
//       // try {
//       //   data = await response.json();
//       // } catch (err) {
//       //   console.warn('Webhook returned non-JSON or empty response:', await response.text());
//       //   data = { reply: "I'm having some technical difficulties. Please try again later." };
//       // }

//       if (!data?.reply) {
//         throw new Error('Invalid response format - missing reply field');
//       }

//       // ✅ No need to call sendBotMessage mutation here
//       // The webhook already saved the bot message

//       return data.reply;

//     } catch (error) {
//       console.error('!!! BOT RESPONSE FAILURE !!!', error);

//       // Optional fallback
//       return "I'm having some technical difficulties. Please try again later.";
//     }
//   };

//   return { respond };
// }

import { useState } from "react";

export default function useBotResponse() {
  const respond = async (chatId, userId, userMessage) => {
    const requestId = Math.random().toString(36).substring(2, 9);
    console.log(`=== BOT RESPONSE INITIATED [${requestId}] ===`, { 
      chatId, 
      userId, 
      userMessage,
      timestamp: new Date().toISOString() 
    });

    try {
      // 1. Call the webhook with enhanced logging
      console.log(`[${requestId}] [1/3] Initiating webhook call...`);
      const controller = new AbortController();
      // const timeout = setTimeout(() => controller.abort(), 20000);
      const timeout = setTimeout(() => controller.abort(), 20000);   
      
      const requestBody = JSON.stringify({
        chat_id: chatId,
        user_id: userId,
        content: userMessage.replace(/\n/g, "\\n").replace(/\r/g, "\\r"),
        timestamp: new Date().toISOString()
      });

      console.log(`[${requestId}] Request body:`, requestBody);

      const response = await fetch('https://n8n-service-xk89.onrender.com/webhook/send-message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
          'X-Request-ID': requestId // For server-side tracking
        },
        body: requestBody,
        signal: controller.signal
      });

      clearTimeout(timeout);
      console.log(`[${requestId}] [2/3] Webhook response received:`, { 
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });

      // 2. Handle response with detailed content inspection
      const responseText = await response.text();
      console.log(`[${requestId}] Raw response text:`, responseText);
      
      if (!responseText.trim()) {
        console.warn(`[${requestId}] Received empty response body with status ${response.status}`);
        // Log additional diagnostics
        console.debug(`[${requestId}] Response details:`, {
          url: response.url,
          redirected: response.redirected,
          type: response.type,
          bodyUsed: response.bodyUsed
        });
        return "I received an empty response from the server. The technical team has been notified.";
      }

      // 3. Enhanced response parsing with diagnostics
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : null;
        console.log(`[${requestId}] [3/3] Parsed response data:`, data);
      } catch (error) {
        console.error(`[${requestId}] JSON parse error:`, error, "for text:", responseText);
        // If it's not JSON but has content, use it directly
        if (responseText) {
          return responseText;
        }
        throw new Error(`Invalid response format: ${error.message}`);
      }

      // 4. Response format handling with fallbacks
      if (data?.error) {
        console.warn(`[${requestId}] Server returned error:`, data.error);
        return data.message || `Error: ${data.error}`;
      }

      return data?.reply || data?.content || data?.message || 
             (typeof data === 'string' ? data : 
             "I received an unexpected response format. Please try again.");

    } catch (error) {
      console.error(`[${requestId}] !!! BOT RESPONSE FAILURE !!!`, error);
      
      // Enhanced error classification
      if (error.name === 'AbortError') {
        return "Request timed out. Please check your connection and try again.";
      }
      
      if (error.message.includes('JSON') || error.message.includes('format')) {
        return "There was a problem processing the response. Please try again.";
      }
      
      return `I'm having technical difficulties (${error.message}). Please try again later.`;
    }
  };

  return { respond };
}
