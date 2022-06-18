import type { AppProps } from "next/app";

import ChatbotContainer from "../components/ChatbotContainer";
import Reducer from "../ChatbotReducer";
import { ChatbotProvider } from "../context/ChatbotContext";

import "../styles/globals.css";
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";
import "remixicon/fonts/remixicon.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChatbotProvider>
      <Component {...pageProps} />
      <Reducer />
      <ChatbotContainer />
    </ChatbotProvider>
  );
}

export default MyApp;
