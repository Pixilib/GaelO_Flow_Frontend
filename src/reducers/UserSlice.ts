import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface Role {
    name: string;
    import: boolean;
    anonymize: boolean;
    export: boolean;
    query: boolean;
    autoQuery: boolean;
    delete: boolean;
    admin: boolean;
    modify: boolean;
    cdBurner: boolean;
    autoRouting: boolean;
  }
export interface UserState {
    token: string | null;
    isLogged: boolean;
    tokenCreationDate: string | null;
    currentUserId: string | null;
    role: Role | null;
}

interface LoginPayload {
    token: string;
    userId: string;
    role: Role;
}

const initialState: UserState = {
    token: null,
    isLogged: false,
    tokenCreationDate: null,
    currentUserId: null,
    role: null
}


const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.token = action.payload.token;
            state.isLogged = true;
            state.tokenCreationDate = new Date().toISOString();
            state.currentUserId = action.payload.userId;
            state.role = action.payload.role;
        },
        logout(state) {
            state.token = null;
            state.isLogged = false;
            state.tokenCreationDate = null;
            state.currentUserId = null;
            state.role = null;
        },
        
    }
})

export const { login, logout} = userSLice.actions;
export default userSLice.reducer;

