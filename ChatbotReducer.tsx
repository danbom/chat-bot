import { useChatbotState, useChatbotDispatch } from "./context/ChatbotContext";

function ReducerSample() {
  const state = useChatbotState();
  const dispatch = useChatbotDispatch();

  const toggleOpened = () => dispatch({ type: "TOGGLE_OPENDED" });

  return (
    <div>
      <p>
        <code>isGood: </code> {state.isOpened ? "true" : "false"}
      </p>
      <div>
        <button type="button" onClick={toggleOpened}>
          TOGGLE_OPENED
        </button>
      </div>
    </div>
  );
}

export default ReducerSample;
