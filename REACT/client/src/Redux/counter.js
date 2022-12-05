// reducer.js
const initialState = {
  value: 0,
};
function change(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, value: state.value + 1 };
    default:
      return state;
  }
}
export default change;
