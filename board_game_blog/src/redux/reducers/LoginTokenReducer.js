import { SET_TOKEN } from '../actions';

const initialState = {
	token: null,
	// Altri stati dell'applicazione
};

const loginTokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		// Altri casi di riduttori
		default:
			return state;
	}
};

export default loginTokenReducer;
