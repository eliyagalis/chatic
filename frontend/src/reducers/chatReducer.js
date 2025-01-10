export const initialState = {
  users: [],
  chats: [],
  room: null,
  messages: [],
  messageText: "",
  isNewChats: false,
  notifications: {},
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "SET_ROOM":
      return { ...state, room: action.payload };
    case "SET_MESSAGES":
      return {
        ...state,
        messages:
          typeof action.payload === "function"
            ? action.payload(state.messages)
            : action.payload,
      };
    case "SET_MESSAGE_TEXT":
      return { ...state, messageText: action.payload };
    case "SET_IS_NEW_CHATS":
      return { ...state, isNewChats: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};