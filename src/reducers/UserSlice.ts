import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Role } from 'src/utils';




export interface UserState {
    token: string | null;
    isLogged: boolean;
    tokenCreationDate: string | null;
    currentUserId: number | null;
    role: Role | null;
}

interface LoginPayload {
    token: string;
    userId: number;
    role: Role;
}

const initialState: UserState = {
    token: null,
    isLogged: false,
    tokenCreationDate: null,
    currentUserId: null,
    role: null
}

const userSlice = createSlice({
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
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
