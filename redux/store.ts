import storage from "redux-persist/lib/storage";
import todosReducer from "./reducers/todosReducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistedReducer = persistReducer({ key: "todos", storage }, todosReducer);
export const store = configureStore({
    reducer: { todosReducer: persistedReducer },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }),
    devTools: true
});
export const persistor = persistStore(store);
export default { store, persistor };
