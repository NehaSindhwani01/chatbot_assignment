import MessageView from '../components/MessageView';
import MessageInput from '../components/MessageInput';

export default function Chat({ chat }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageView chat_id={chat.id} />
      </div>
      <div className="p-4 border-t">
        <MessageInput chat_id={chat.id} />
      </div>
    </div>
  );
}
