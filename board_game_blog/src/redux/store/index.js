import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import loginTokenReducer from '../reducers/LoginTokenReducer';
import userReducer from '../reducers/UserReducer';
import articlesReducer from '../reducers/ArticlesReducer';
import commentsReducer from '../reducers/CommentReducer';
import categoriesReducer from '../reducers/CategoriesReducer';
import AuthSliceReducer from '../reducers/AuthSliceReducer';
import popupReducer from '../reducers/PopupReducer';

const persistConfig = {
	key: 'root',
	storage,
	transforms: [
		encryptTransform({
			secretKey: process.env.REACT_APP_SECRET_KEY,
		}),
	],
};

const rootReducer = combineReducers({
	auth: AuthSliceReducer,
	loginToken: loginTokenReducer,
	userReducer: userReducer,
	articlesReducer: articlesReducer,
	commentsReducer: commentsReducer,
	categoriesReducer: categoriesReducer,
	popupReducer: popupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
