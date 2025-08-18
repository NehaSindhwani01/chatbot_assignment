import { useState } from "react";
import { useAuthenticationStatus, useSignOut } from "@nhost/react";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ChatList from "./components/ChatList";
import MessageView from "./components/MessageView";
import MessageInput from "./components/MessageInput";

export default function App() {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();
  const [showSignUp, setShowSignUp] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  if (!isAuthenticated) {
    return showSignUp ? (
      <SignUp switchToSignIn={() => setShowSignUp(false)} />
    ) : (
      <SignIn switchToSignUp={() => setShowSignUp(true)} />
    );
  }

  return (
    <div className="flex h-screen">
      <ChatList 
        onSelectChat={setActiveChat} 
        selectedChatId={activeChat} // <-- Add this
      />

      <div className="flex flex-col flex-1">
        {/* <div className="flex justify-between items-center p-4 border-b">
          <h1 className="font-bold">Chatbot</h1>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div> */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-900 to-purple-800 border-b border-white border-opacity-20">
  <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
    Chatbot
  </h1>
  <button
    onClick={signOut}
    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-red-500/20 flex items-center space-x-2"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" 
        clipRule="evenodd" 
      />
    </svg>
    <span>Logout</span>
  </button>
</div>
        <MessageView chatId={activeChat} />
        <MessageInput chatId={activeChat} />
      </div>
    </div>
  );
}
