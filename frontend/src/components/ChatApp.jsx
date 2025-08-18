// ParentComponent.js
import { useState } from 'react';
import ChatList from './ChatList';

function ParentComponent() {
  const [selectedChatId, setSelectedChatId] = useState(null); // Initialize as null

  return (
    <div>
      <ChatList 
        onSelectChat={(id) => {
          console.log('Chat selected:', id); // Add this
          setSelectedChatId(id);
        }}
        selectedChatId={selectedChatId}
      />
    </div>
  );
}