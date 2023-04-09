import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: 'reloadSlice',
    initialState: { reload: false },
    reducers: {
        reload(state) {
            state.reload = !state.reload;
        }
    }
});

export const {reload} = reloadSlice.actions;
export default reloadSlice.reducer;
