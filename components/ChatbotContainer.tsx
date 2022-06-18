import Chatbot from "react-chatbot-kit";
import styled from "styled-components";

import config from "../bot/config.js";
import MessageParser from "../bot/MessageParser.js";
import ActionProvider from "../bot/ActionProvider.js";
import { useChatbotState, useChatbotDispatch } from "../context/ChatbotContext";

const ChatbotIcon = styled.div`
  position: fixed;
  right: 30px;
  bottom: 25px;
  width: 4rem;
  height: 4rem;
  background: rgb(92, 130, 255);
  background: linear-gradient(
    90deg,
    rgba(157, 92, 255, 1) 0%,
    rgba(92, 130, 255, 1) 100%
  );
  border-radius: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px, rgb(0 0 0 / 15%) 0px 8px 30px,
    rgb(255 255 255 / 20%) 0px 0px 0px 1px inset !important;
  /* transition: box-shadow 0.2s ease-out 0s !important;
  transition-property: box-shadow !important;
  transition-duration: 0.2s !important;
  transition-timing-function: ease-out !important;
  transition-delay: 0s !important; */

  i {
    color: #ffffff;
    font-size: 2.5rem;
  }
`;

function ChatbotContainer() {
  const state = useChatbotState();
  const dispatch = useChatbotDispatch();

  const toggleOpened = () => dispatch({ type: "TOGGLE_OPENDED" });

  return state.isOpened ? (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  ) : (
    <ChatbotIcon onClick={toggleOpened}>
      <i className="ri-wechat-fill" />
    </ChatbotIcon>
  );
}

export default ChatbotContainer;
