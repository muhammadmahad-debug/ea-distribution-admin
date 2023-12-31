const initialState = null;

const SettingId = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ID":
      return action.payload;
    default:
      return state;
  }
};

export default SettingId;