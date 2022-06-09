import terms from "../data/terms.json";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    // if (message.includes("안녕")) {
    //   this.actionProvider.handleHello();
    // }

    // terms.forEach((term) => {
    //   if (message.includes(term.term)) {
    //     this.actionProvider.handleTerms(term);
    //   }
    // });

    this.actionProvider.handleSearch(message);

    // else {
    //   this.actionProvider.handleDontKnow();
    // }
    // terms.map((term) => {
    //   if (message.includes(term.term)) {
    //     this.actionProvider.handleTerms(term);
    //   }
    //   return term;
    // });
  }
}

export default MessageParser;
