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
      const {
        data: { items },
      } = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/webkr.json",
        {
          params: {
            query: search,
            display: 1,
          },
          headers: {
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        },
        { mode: "cors" }
      );

      // const removeTags = items[0].description.replace(/<(\/b|b)([^>]*)>/gi, "");

      const result = items[0].description;

      const message = this.createChatbotMessage(
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: result }} />
      );

      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } catch (error) {
      console.log(error);
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
