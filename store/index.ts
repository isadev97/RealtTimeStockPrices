import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { save, load } from "redux-localstorage-simple";

interface AppState {
  symbol: string;
}

const initialState: AppState = {
  symbol: 'GOOG',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setSymbol } = appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  preloadedState: load(),
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(save())
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

