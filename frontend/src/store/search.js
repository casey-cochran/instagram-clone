import { csrfFetch } from "./csrf";

const SEARCH_VALUE = "user/SEARCH-THIS";

const searchVal = (value) => ({
    type: SEARCH_VALUE,
    value
})

export const searchUser = (searchValue) => async (dispatch) => {
  const response = await csrfFetch("/api/search", {
    method: "POST",
    body: JSON.stringify({
      searchValue,
    }),
  });
  const data = await response.json();
  dispatch(searchVal(data))
};

const initialState = { Search: {} };

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SEARCH_VALUE:
      newState = { ...state };
      newState.Search = action.value;
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
