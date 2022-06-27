import {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  ReactNode,
} from "react";

// 필요한 타입들을 미리 선언

// type Color = "red" | "orange" | "yellow";

// 상태를 위한 타입
type State = {
  isOpened: boolean;
  sessionkey: string;
};

// 모든 액션들을 위한 타입
type Action =
  // | { type: "SET_COUNT"; count: number }
  // | { type: "SET_TEXT"; text: string }
  // | { type: "SET_COLOR"; color: Color }
  { type: "TOGGLE_OPENDED" } | { type: "SET_SESSIONKEY"; sessionkey: string };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type ChatbotDispatch = Dispatch<Action>;

// Context 만들기
const ChatbotStateContext = createContext<State | null>(null);
const ChatbotDispatchContext = createContext<ChatbotDispatch | null>(null);

// 리듀서
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_OPENDED":
      return {
        ...state,
        isOpened: !state.isOpened,
      };
    case "SET_SESSIONKEY":
      return {
        ...state,
        sessionkey: action.sessionkey,
      };
    default:
      throw new Error("Unhandled action");
  }
}

// SampleProvider 에서 useReduer를 사용하고
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    isOpened: false,
    sessionkey: "",
  });

  return (
    <ChatbotStateContext.Provider value={state}>
      <ChatbotDispatchContext.Provider value={dispatch}>
        {children}
      </ChatbotDispatchContext.Provider>
    </ChatbotStateContext.Provider>
    // <div>{children}</div>
  );
}

// state 와 dispatch 를 쉽게 사용하기 위한 커스텀 Hooks
export function useChatbotState() {
  const state = useContext(ChatbotStateContext);
  if (!state) throw new Error("Cannot find ChatbotProvider"); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useChatbotDispatch() {
  const dispatch = useContext(ChatbotDispatchContext);
  if (!dispatch) throw new Error("Cannot find ChatbotProvider"); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
