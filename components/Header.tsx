import styled from "styled-components";

import { useChatbotDispatch } from "../context/ChatbotContext";

const HeaderContainer = styled.div`
  background: rgb(92, 130, 255);
  background: linear-gradient(
    90deg,
    rgba(157, 92, 255, 1) 0%,
    rgba(92, 130, 255, 1) 100%
  );
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.4rem;

  .ri-close-line,
  .ri-arrow-left-s-line {
    cursor: pointer;
    font-size: 1.5rem;
    color: #ffffff;
  }
`;

function Header() {
  const dispatch = useChatbotDispatch();

  const toggleOpened = () => dispatch({ type: "TOGGLE_OPENDED" });

  return (
    <HeaderContainer>
      <i className="ri-close-line" role="presentation" onClick={toggleOpened} />
    </HeaderContainer>
  );
}

export default Header;
