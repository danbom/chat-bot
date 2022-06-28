import ChatbotContainer from "../components/ChatbotContainer";
import { ChatbotProvider } from "../context/ChatbotContext";

import "../styles/globals.css";
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";
import "remixicon/fonts/remixicon.css";

function MyApp() {
  return (
    <ChatbotProvider>
      <ChatbotContainer />
    </ChatbotProvider>
  );
}

export default MyApp;
