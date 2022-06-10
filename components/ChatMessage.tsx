/* eslint-disable operator-linebreak */
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [msg, setMsg] = useState(message.substring(0, 100));
  const [isLong, setIsLong] = useState(!!(bot && message.length > 100));
  const [feedback, setFeedback] = useState(false);

  const seeAllText = () => {
    setMsg(message);
    setIsLong(false);
  };

  const sendFeedback = (str: string, fdb: string) => {
    console.log(`"${str}"에 대한 피드백 : ${fdb}`);
    alert("피드백을 전송했습니다. 감사합니다!");
  };

  useEffect(() => {
    if (
      !message.includes("궁금한 내용을 입력해주세요.") &&
      !message.includes("검색 내용을 찾을 수 없습니다!")
    ) {
      setFeedback(true);
    }
  }, []);

  return (
    <EntireContainer isBot={bot} isLong={isLong}>
      <ChatMessageContainer isBot={bot} isLong={isLong}>
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
      {bot && feedback && (
        <HasFeedbackContainer>
          <FeedbackContainer
            isBot={bot}
            isLong={false}
            onClick={(e) => {
              e.preventDefault();
              sendFeedback(message, "GOOD!");
            }}
          >
            👍
          </FeedbackContainer>
          <FeedbackContainer
            isBot={bot}
            isLong={false}
            onClick={(e) => {
              e.preventDefault();
              sendFeedback(message, "BAD!");
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
