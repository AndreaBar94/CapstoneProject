import { SET_ALL_CATEGORIES } from '../actions';

const initialState = {
	categories: null,
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};

export default categoriesReducer;
