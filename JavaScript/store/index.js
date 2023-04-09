import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import reloadSliceReducer from "./reloadSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reload: reloadSliceReducer
    }
})

export default store
