export const LIST_INITIAL = {
  card: {
    name: "",
    gender: "",
    homeworld: "",
    mass: null,
    favorites: false,
  },
  modal: false,
};

export const listReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CARD":
      return {
        ...state,
        card: {
          ...state.card,
          [action.payload.name]: action.payload.value,
        },
      };
    case "IS_MODAL":
      return {
        ...state,
        card: {
          name: "",
          gender: "",
          homeworld: "",
          mass: null,
          favorites: false,
        },
        modal: !state.modal,
      };

    default:
      return state;
  }
};
