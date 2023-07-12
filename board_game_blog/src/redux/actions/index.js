import { loginSuccess } from '../reducers/AuthSliceReducer';

const loginEndpoint = 'http://localhost:3142/auth/login';
const signUpEndpoint = 'http://localhost:3142/auth/signup';
const articlesEndpoint = 'http://localhost:3142/articles';
const getLoggedUserEndpoint = 'http://localhost:3142/users/me';
const userEndpoint = 'http://localhost:3142/users';
const commentsEndpoint = 'http://localhost:3142/comments';
const categoriesEndpoint = 'http://localhost:3142/categories';

export const SET_TOKEN = 'SET_TOKEN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_ALL_ARTICLES = 'SET_ALL_ARTICLES';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const SET_ARTICLE = 'SET_ARTICLE';
export const SET_COMMENT = 'SET_COMMENT';
export const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES';

//login
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
				dispatch({ type: SET_TOKEN, payload: data.accessToken });
				dispatch(loginSuccess(data));
				navigate('/home');
				dispatch(getUser(data.accessToken));
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//signup
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
				navigateToLogin('/login');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//current user
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

//edit user
export const updateUser = (userData, userId) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(userEndpoint + `/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(userData),
			});
			if (response.ok) {
				const editedUser = await response.json();
				dispatch({ type: SET_CURRENT_USER, payload: editedUser });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//delete user
export const deleteUser = (userId, navigate) => {
	return async (dipatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(userEndpoint + `/${userId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//get all articles
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
				dispatch({ type: SET_ALL_ARTICLES, payload: articles });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//search article with filter
export const searchArticleWithFilter = (filter, searchKeyword, navigate) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint + `/search/${filter}/${searchKeyword}`, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				const articles = await response.json();
				dispatch({ type: SET_ALL_ARTICLES, payload: articles });
				navigate('/articles');
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
				console.log(article);
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
				dispatch({ type: UPDATE_ARTICLE, payload: editedArticle });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//delete an article
export const deleteArticle = (articleId, navigate) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(articlesEndpoint + `/${articleId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				navigate('/home');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// post a comment
export const postComment = (articleId, commentData) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(commentsEndpoint + `/article/${articleId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(commentData),
			});
			if (response.ok) {
				const newComment = await response.json();
				dispatch({ type: SET_COMMENT, payload: [newComment] });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//get categories
export const getCategories = () => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(categoriesEndpoint, {
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				const categories = await response.json();
				dispatch({ type: SET_ALL_CATEGORIES, payload: categories });
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//set likes
export const setLikes = (like) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(`http://localhost:3142/likes/${like.article}/${like.user}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(like),
			});
			if (response.ok) {
				dispatch(getArticleById(like.article));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//edit comment
export const editedComment = (commentId, commentData) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(commentsEndpoint + `/${commentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify(commentData),
			});
			if (response.ok) {
				const newComment = await response.json();
				dispatch({ type: SET_COMMENT, payload: [newComment] });
				dispatch(getArticles());
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//delete comment
export const deleteComment = (commentId, articleId) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(commentsEndpoint + `/${commentId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				dispatch(getArticleById(articleId));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

//blame comment
export const blameComment = (commentId) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().loginToken.token;
			const response = await fetch(commentsEndpoint + `/blame/${commentId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			});
			if (response.ok) {
				const newComment = await response.json();
				dispatch({ type: SET_COMMENT, payload: [newComment] });
				dispatch(getArticles());
			}
		} catch (error) {
			console.log(error);
		}
	};
};
