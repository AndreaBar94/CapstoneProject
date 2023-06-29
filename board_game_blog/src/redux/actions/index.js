const loginEndpoint = 'http://localhost:3142/auth/login';
const signUpEndpoint = 'http://localhost:3142/auth/signup';
//const getAllArticlesEndpoint = 'http://localhost:3142/articles';
const getLoggedUserEndpoint = 'http://localhost:3142/users/me';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const login = (formData, navigate) => {
	return async (dispatch) => {
		try {
			const response = await fetch(loginEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			if (response.ok) {
				//console.log(data.accessToken); //check in console if the token is ok
				dispatch({ type: SET_TOKEN, payload: data.accessToken });
				navigate('/HomePage');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const signUp = (formData, navigateToLogin) => {
	return async (dispatch) => {
		try {
			const response = await fetch(signUpEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			if (response.ok) {
				navigateToLogin('/');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const getUser = () => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			//console.log(token);
			const response = await fetch(getLoggedUserEndpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				const user = await response.json();
				//console.log(user);
				dispatch({ type: SET_CURRENT_USER, payload: user }); // Memorizza l'utente nello stato
			} else {
				// Gestisci il caso in cui la richiesta non sia andata a buon fine
				console.log("Errore nella richiesta di ottenere l'utente");
			}
		} catch (error) {
			console.log(error);
		}
	};
};
