/* eslint-disable operator-linebreak */
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

interface Bot {
  isBot?: boolean;
  isLong: boolean;
}

const EntireContainer = styled.div<Bot>`
  display: flex;
  flex-direction: ${(props) => (props.isBot ? "column" : "row")};
  justify-content: ${(props) => (props.isBot ? "flex-start" : "flex-end")};
  max-width: 85%;
`;

const HasFeedbackContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
`;

const ChatMessageContainer = styled.div<Bot>`
  width: fit-content;
  max-width: 100%;
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
  overflow-x: hidden;
  white-space: pre-wrap;

  .text {
    overflow: ${(props) => (props.isLong ? "hidden" : "")};
    text-overflow: ${(props) => (props.isLong ? "ellipsis" : "")};
    display: ${(props) => (props.isLong ? "-webkit-box" : "")};
    -webkit-line-clamp: ${(props) => (props.isLong ? "3" : "")};
    -webkit-box-orient: ${(props) => (props.isLong ? "vertical" : "")};
  }

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

const FeedbackContainer = styled(ChatMessageContainer)`
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;

  & + & {
    margin-left: 0.2rem;
  }
`;

function ChatMessage({ message, bot }: any) {
  const parseMessage = (m: any) => {
    const list = m.messageList.map(
      (_m: any) =>
        _m.highlight === "Y"
          ? `<b>${_m.message.toString()}</b>`
          : _m.message.toString()
      // eslint-disable-next-line function-paren-newline
    );
    return list.join("\n\n");
  };

  const [msg, setMsg] = useState(
    message.messageList ? parseMessage(message) : message
  );
  const [isLong, setIsLong] = useState(!!bot && message.messageList);
  const [feedback, setFeedback] = useState(false);

  const seeAllText = () => {
    // setMsg(message);
    setIsLong(false);
  };

  const sendFeedback = async (fdb: string) => {
    console.log(`"${message.response_idx}"에 대한 피드백 : ${fdb}`);
    alert("피드백을 전송했습니다. 감사합니다!");
    const data = await axios.post(
      "https://1a5wyb1w3i.execute-api.ap-northeast-2.amazonaws.com/chatbot_dev/chat_message_dev",
      JSON.stringify({
        msg_type: "E",
        evaluation_idx: message.response_idx,
        evaluation_result: fdb,
        session_key: "",
      }),
      {
        headers: {
          "x-api-key": "9uqJbpLQLB1LMyOm3ByDy83eDNYoOt8T79hX5qG9",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);
  };

  useEffect(() => {
    if (message.messageList) {
      setFeedback(true);
    }
  }, []);

  return (
    <EntireContainer isBot={bot} isLong={isLong}>
      <ChatMessageContainer isBot={bot} isLong={isLong}>
        <div className="text" dangerouslySetInnerHTML={{ __html: msg }} />
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
      {bot && feedback && (
        <HasFeedbackContainer>
          <FeedbackContainer
            isBot={bot}
            isLong={false}
            onClick={(e) => {
              e.preventDefault();
              sendFeedback("Y");
            }}
          >
            👍
          </FeedbackContainer>
          <FeedbackContainer
            isBot={bot}
            isLong={false}
            onClick={(e) => {
              e.preventDefault();
              sendFeedback("N");
            }}
          >
            👎
          </FeedbackContainer>
        </HasFeedbackContainer>
      )}
    </EntireContainer>
  );
}

export default ChatMessage;
