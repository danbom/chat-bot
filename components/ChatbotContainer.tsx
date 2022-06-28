import Chatbot from "react-chatbot-kit";

import config from "../bot/config.js";
import MessageParser from "../bot/MessageParser.js";
import ActionProvider from "../bot/ActionProvider.js";

function ChatbotContainer() {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
}

export default ChatbotContainer;
