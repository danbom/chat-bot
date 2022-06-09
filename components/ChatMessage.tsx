/* eslint-disable operator-linebreak */
import { useState } from "react";
import styled from "styled-components";

interface Bot {
  isBot?: boolean;
  isLong: boolean;
}

const ChatMessageContainer = styled.div<Bot>`
  max-width: 85%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.isBot ? "#f2f2f2" : "#5c82ff")};
  border-radius: ${(props) =>
    props.isBot ? "20px 20px 20px 5px" : "20px 20px 5px 20px"};
  margin-left: 0.4rem;
  color: ${(props) => (props.isBot ? "#3d4f6e" : "#ffffff")};
  padding: ${(props) => (props.isBot ? "0.8rem 1.2rem" : "0.7rem 1.1rem")};
  font-weight: ${(props) => (props.isBot ? "500" : "400")};
  font-size: 0.97rem;
  line-height: 1.3rem;
  word-break: keep-all;

  .see-all {
    display: ${(props) => (props.isBot && props.isLong ? "block" : "none")};
    font-size: 0.8rem;
    font-weight: 300;
    text-align: center;
    border-radius: 10px;
    background-color: #ffffff60;
    margin-top: 1rem;
    line-height: 2.3rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #ffffffaa;
    }
  }
`;

function ChatMessage({ message, bot }: any) {
  const [msg, setMsg] = useState(message.substring(0, 100));
  const [isLong, setIsLong] = useState(!!(bot && message.length > 100));
  const seeAllText = () => {
    setMsg(message);
    setIsLong(false);
  };
  return (
    <ChatMessageContainer isBot={bot} isLong={isLong} id="dd">
      <div dangerouslySetInnerHTML={{ __html: msg }} />
      {bot && (
        <div
          className="see-all"
          onClick={(e) => {
            e.preventDefault();
            seeAllText();
          }}
          role="presentation"
        >
          전체 보기
        </div>
      )}
    </ChatMessageContainer>
  );
}

export default ChatMessage;
