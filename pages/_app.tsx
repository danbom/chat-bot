import type { AppProps } from "next/app";
import Chatbot from "react-chatbot-kit";

import config from "../bot/config.js";
import MessageParser from "../bot/MessageParser.js";
import ActionProvider from "../bot/ActionProvider.js";

import "../styles/globals.css";
import "react-chatbot-kit/build/main.css";
import "../styles/chatbot.css";
import "remixicon/fonts/remixicon.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </>
  );
}

export default MyApp;
