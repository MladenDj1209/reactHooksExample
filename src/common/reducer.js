
function reducer(state , action) {
  debugger
  switch (action.type) {
    case 'setPage':
      return {
        ...state,
        page: action.i
      };
      case 'getPage':
        return {
          page: state.page
        }
    default:
      throw new Error();
  }
}

export default reducer