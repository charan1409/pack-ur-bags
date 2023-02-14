
const initialState = {
    user: {},
    tours: []
  };
  function change(state = initialState, action) {
    switch (action.type) {
      case "user":
        return { ...state, user: action.payload };
      case "tours":
        return { ...state, tours: action.payload };
      default:
        return state;
    }
  }
  export default change;
  