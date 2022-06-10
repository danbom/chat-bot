import React from "react";

export type ChatbotContextModel = {
  close: () => void;
};

const ChatbotContext = React.createContext<ChatbotContextModel>({
  close: () => {},
});

export default ChatbotContext;
