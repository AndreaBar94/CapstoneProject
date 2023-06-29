import { SET_CURRENT_USER } from '../actions';

const initialState = {
	currentUser: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
			};
		// Altri casi di riduttori
		default:
			return state;
	}
};

export default userReducer;
