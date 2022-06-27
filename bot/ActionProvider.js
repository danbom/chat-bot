import axios from "axios";

import { useChatbotState, useChatbotDispatch } from "../context/ChatbotContext";

import terms from "../data/terms.json";

class ActionProvider {
  constructor(
    createChatbotMessage,
    setStateFunc,
    createClientMessage,
    state,
    dispatch
  ) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.state = useChatbotState();
    this.dispatch = useChatbotDispatch();
  }

  handleHello() {
    const message = this.createChatbotMessage("안녕하세요, 반갑습니다!");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleSearch = async (msg) => {
    // const ID_KEY = "zbVgYGcd26CBZlj_XKtv";
    // const SECRET_KEY = "GKDwG1g0rs";
    const search = msg;

    // const state = useChatbotState(); //TODO : 여기서 에러남
    // const dispatch = useChatbotDispatch();

    try {
      console.log(`세션키 : ${this.state.sessionkey}`);

      const setSessionkey = () =>
        this.dispatch({ type: "SET_SESSIONKEY", sessionkey: "" });

      const data = await axios.post(
        "https://1a5wyb1w3i.execute-api.ap-northeast-2.amazonaws.com/chatbot_dev/chat_message_dev",
        JSON.stringify({
          msg_type: "Q",
          msg: search,
          session_key: this.state.sessionkey,
        }),
        {
          headers: {
            "x-api-key": "9uqJbpLQLB1LMyOm3ByDy83eDNYoOt8T79hX5qG9",
            "Content-Type": "application/json",
          },
        },
        { mode: "cors" }
      );

      const message = this.createChatbotMessage(JSON.parse(data.data.body));
      // setSessionkey();

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } catch (error) {
      console.log(`에러 : ${error}`);
      const message = this.createChatbotMessage(
        `에러가 발생했습니다! 관리자에게 문의해주세요. 세션키 : ${this.state.sessionkey}`
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  };

  handleTerms(term) {
    // const [message, setMessage] = useState("");
    let message = "";

    terms.map((t) => {
      if (t.term === term.term) {
        message = this.createChatbotMessage(
          <div>
            <strong>{t.term}</strong>은(는) {t.meaning}
          </div>
        );
      }

      return t;
    });

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleDontKnow() {
    const message =
      this.createChatbotMessage("죄송합니다. 이해하지 못했습니다.");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
