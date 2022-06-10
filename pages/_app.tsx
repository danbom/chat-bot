import type { AppProps } from "next/app";

// @ts-ignore
import ChatbotContainer from "../components/ChatbotContainer.tsx";

import "../styles/globals.css";
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";
import "remixicon/fonts/remixicon.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ChatbotContainer />
    </>
  );
}

export default MyApp;
