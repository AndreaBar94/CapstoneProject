import { SET_ALL_ARTICLES } from '../actions';

const initialState = {
	articles: null,
};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_ARTICLES:
			return {
				...state,
				articles: action.payload,
			};
		// Altri casi di riduttori
		default:
			return state;
	}
};

export default articlesReducer;
