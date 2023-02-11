
const initialState = {
    value: 0,
    username: [],
    tours: []
  };
  function change(state = initialState, action) {
    switch (action.type) {
      case "increment":
        return { ...state, value: state.value + 1 };
      case "username":
        return { ...state, username: action.payload };
      case "tours":
        return { ...state, tours: action.payload };
      default:
        return state;
    }
  }
  export default change;
  