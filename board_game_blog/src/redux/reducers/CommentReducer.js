import { SET_COMMENT } from '../actions';

const initialState = {
	comment: null,
	currentComment: null,
};

const commentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_COMMENT:
			return {
				...state,
				comment: action.payload,
			};
		default:
			return state;
	}
};

export default commentsReducer;
