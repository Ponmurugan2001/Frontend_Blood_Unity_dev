import { createSlice } from '@reduxjs/toolkit'

//alertslice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        deleteUser:(state) => {
            state.user = null
    },
        setUser: (state, action) => {
            state.user = action.payload
    },
}

})

//exporting reducers from the alertslice
export const { setUser,deleteUser } = userSlice.actions;