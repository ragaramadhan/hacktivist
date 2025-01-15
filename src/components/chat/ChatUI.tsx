import { IonIcon } from "@ionic/react";
import {
  sendOutline,
  videocamOutline,
  // callOutline,
  // micOutline,
  // micOffOutline,
  // videocamOffOutline,
  // closeCircleOutline
} from "ionicons/icons";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
}

interface Contact {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

interface ChatUIProps {
  closeRoom: (e: React.FormEvent) => void;
  clientId: string;
  contacts: Contact[];
  selectedContact: Contact | null;
  messages: Message[];
  newMessage: string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onContactSelect: (contact: Contact) => void;
  onMessageChange: (message: string) => void;
  onMessageSubmit: (e: React.FormEvent) => void;
}
export default function ChatUI({
  // closeRoom,
  clientId,
  contacts,
  selectedContact,
  messages,
  newMessage,
  messagesEndRef,
  onContactSelect,
  onMessageChange,
  onMessageSubmit,
}: ChatUIProps) {
  const router = useRouter();

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-80 bg-slate-800/80 backdrop-blur-sm border-r border-slate-700">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-2">Contacts</h3>
        </div>
        <div className="divide-y divide-slate-700">
          {contacts?.map((contact) => (
            <div key={contact.id} onClick={() => onContactSelect(contact)} className={`p-4 cursor-pointer transition-colors ${selectedContact?.id === contact.id ? "bg-slate-700/50" : "hover:bg-slate-700/30"}`}>
              <h3 className="text-white font-medium">{contact.name}</h3>
              <p className="text-sm text-slate-400">{contact.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 flex justify-between">
              <div>
                <h3 className="text-white font-medium">{selectedContact.name}</h3>
                <p className="text-sm text-slate-400">{selectedContact.role}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => router.push("/video-call")} className="p-2.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors">
                  <IonIcon icon={videocamOutline} className="text-xl" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === clientId ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === clientId ? "bg-blue-600/90 text-white" : "bg-slate-700/90 text-slate-100"}`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={onMessageSubmit} className="p-4 bg-slate-800/90 backdrop-blur-sm border-t border-slate-700">
              <div className="flex gap-2">
                <input type="text" value={newMessage} onChange={(e) => onMessageChange(e.target.value)} placeholder="Type a message..." className="flex-1 bg-slate-700/50 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                <button type="submit" className="p-2.5 bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-colors">
                  <IonIcon icon={sendOutline} className="text-white text-xl" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
}
