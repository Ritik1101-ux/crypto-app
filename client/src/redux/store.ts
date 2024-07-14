import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cryptoState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: any) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cryptoState", serializedState);
};

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        crypto: cryptoReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
