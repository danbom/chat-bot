import axios from "axios";

import terms from "../data/terms.json";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello() {
    const message = this.createChatbotMessage("안녕하세요, 반갑습니다!");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }

  handleSearch = async (msg) => {
    const ID_KEY = "zbVgYGcd26CBZlj_XKtv";
    const SECRET_KEY = "GKDwG1g0rs";
    const search = msg;
    try {
      const data = await axios.post(
        "https://1a5wyb1w3i.execute-api.ap-northeast-2.amazonaws.com/chatbot_dev/chat_message_dev",
        JSON.stringify({
          msg_type: "Q",
          msg: search,
          session_key: "",
        }),
        {
          headers: {
            "x-api-key": "9uqJbpLQLB1LMyOm3ByDy83eDNYoOt8T79hX5qG9",
            "Content-Type": "application/json",
          },
        },
        { mode: "cors" }
      );

      console.log(JSON.parse(data.data.body));
      const message = this.createChatbotMessage(JSON.parse(data.data.body));

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line operator-linebreak
      const message = this.createChatbotMessage(
        `검색 내용을 찾을 수 없습니다! 또는 권한을 확인하세요. <a href=${"https://cors-anywhere.herokuapp.com/"}>링크 가기</a>`
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
    // eslint-disable-next-line operator-linebreak
    const message =
      this.createChatbotMessage("죄송합니다. 이해하지 못했습니다.");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
