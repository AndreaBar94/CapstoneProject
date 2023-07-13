import { SET_ALL_ARTICLES, UPDATE_ARTICLE, SET_ARTICLE } from '../actions';

const initialState = {
	articles: null,
	currentArticle: null,
};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALL_ARTICLES:
			return {
				...state,
				articles: action.payload,
				loading: false,
			};
		case UPDATE_ARTICLE:
			const updatedArticle = action.payload;
			const updatedArticles = state.articles.map((article) => {
				if (article.articleId === updatedArticle.articleId) {
					return updatedArticle;
				}
				return article;
			});
			return {
				...state,
				articles: updatedArticles,
			};
		case SET_ARTICLE:
			return {
				...state,
				currentArticle: action.payload,
			};
		default:
			return state;
	}
};

export default articlesReducer;
