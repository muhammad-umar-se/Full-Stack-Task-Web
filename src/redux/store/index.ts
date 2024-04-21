import logger from 'redux-logger';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import authReducer, { AuthState } from '../slices/auth-slice';

export type RootState = {
  auth: AuthState;
};

const reducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (state: RootState | undefined, action: any) => {
  if (action.type === 'auth/LogOut') {
    state = undefined;
  }
  return reducers(state, action);
};

// const middleware: (getDefaultMiddleware: () => Middleware<{}, RootState>[]) => Middleware<{}, RootState>[] = (getDefaultMiddleware) => {
//   const thunkMiddleware: ThunkMiddleware<RootState> = thunk as RootState;
//   return [
//     ...getDefaultMiddleware(),
//     thunkMiddleware,
//     logger,
//   ];
// };

const middleware: Middleware<{}, RootState>[] = [
  thunk as ThunkMiddleware<RootState>,
  logger,
];

// Create the store
const store = configureStore({
  reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware<any>({
      thunk: true,
      logger: true,
    }).concat(middleware),
  devTools: true,
});

export default store;
