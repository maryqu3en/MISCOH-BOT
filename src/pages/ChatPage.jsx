import { useParams } from "react-router-dom";
import ChatRoom from "../components/ChatRoom";

const ChatPage = () => {
  const { chatId } = useParams();
  return <ChatRoom sessionId={chatId} />;
};

export default ChatPage;