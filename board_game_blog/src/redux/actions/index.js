const loginEndpoint = 'http://localhost:3142/auth/login';
const signUpEndpoint = 'http://localhost:3142/auth/signup';
const articlesEndpoint = 'http://localhost:3142/articles';
const getLoggedUserEndpoint = 'http://localhost:3142/users/me';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_ALL_ARTICLES = 'SET_ALL_ARTICLES';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const SET_ARTICLE = 'SET_ARTICLE';
//login endpoint
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

//signup endpoint
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

//current user endpoint
export const getUser = () => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(getLoggedUserEndpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				const user = await response.json();
				dispatch({ type: SET_CURRENT_USER, payload: user }); // Memorizza l'utente nello stato
			} else {
				// Gestisci il caso in cui la richiesta non sia andata a buon fine
				console.log('Error trying to fetch user');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//get all articles endpoint
export const getArticles = () => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				const articles = await response.json();
				console.log(articles);
				dispatch({ type: SET_ALL_ARTICLES, payload: articles });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//get article by id
export const getArticleById = (articleId) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint + `/${articleId}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				const article = await response.json();
				dispatch({ type: SET_ARTICLE, payload: article });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//post an article
export const postArticle = (articleData) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(articleData),
			});
			if (response.ok) {
				const newArticle = await response.json();
				dispatch({ type: SET_ALL_ARTICLES, payload: [newArticle] });
				dispatch(getArticles());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//edit an article
export const editArticle = (articleId, articleData) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint + `/${articleId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(articleData),
			});
			if (response.ok) {
				const editedArticle = await response.json();
				dispatch({ type: UPDATE_ARTICLE, payload: [editedArticle] });
			}
		} catch (error) {
			console.log(error);
		}
	};
};
