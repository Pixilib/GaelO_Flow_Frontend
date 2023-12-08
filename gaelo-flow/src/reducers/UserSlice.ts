import { PayloadAction, createSlice } from '@reduxjs/toolkit';


//create a type for the initial state of the slice
interface UserState {
    token: string | null;
    isLogged: boolean;
    tokenCreationDate: string | null;
    currentUserId: string | null;
}

interface LoginPayload {
    token: string;
    userId: string;
}

const initialState: UserState = {
    token: null,
    isLogged: false,
    tokenCreationDate: null,
    currentUserId: null
}


const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        login(state,action: PayloadAction<LoginPayload>){
            state.token = action.payload.token;
            state.isLogged = true;
            state.tokenCreationDate = new Date().toISOString();
            state.currentUserId = action.payload.userId;
        },
        logout(state){
            state.token = null;
            state.isLogged = false;
            state.tokenCreationDate = null;
            state.currentUserId = null;
        }
    }
})

export const {login,logout} = userSLice.actions;
export default userSLice.reducer;
        
