const initialState = {
  bromita: [
    {
      id: 1,
      name: "Bromita",
      price: "1.00",
      quantity: 0,
      image: "https://i.imgur.com/X0qQ9.jpg",
    },
  ],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_BROMITA":
      return {
        ...state,
        bromita: [...state.bromita, payload],
      };
    default:
      return state;
  }
}
