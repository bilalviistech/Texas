import { configureStore } from "@reduxjs/toolkit";
import authReducer from './redux/AuthSlice';

// Function to load state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Function to save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

// Load persisted state
const persistedState = loadState();

const store = configureStore({
    reducer: {
        user: authReducer // Use the correct reducer
    },
    preloadedState: persistedState
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
    saveState({
        user: store.getState().user
    });
});

export default store;

