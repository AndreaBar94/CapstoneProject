import { SHOW_ACTION_POPUP, HIDE_ACTION_POPUP } from '../actions';

const initialState = {
	showPopup: false,
	popupMessage: '',
	isSuccess: null,
};

const popupReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_ACTION_POPUP:
			return {
				...state,
				showPopup: true,
				popupMessage: action.payload.message,
				isSuccess: action.payload.isSuccess,
			};
		case HIDE_ACTION_POPUP:
			return {
				...state,
				showPopup: false,
				popupMessage: '',
				isSuccess: null,
			};
		default:
			return state;
	}
};

export default popupReducer;
