import { PayloadAction, createSlice } from '@reduxjs/toolkit';


interface Role {
    Name: string;
    Import: boolean;
    Anonymize: boolean;
    Export: boolean;
    Query: boolean;
    AutoQuery: boolean;
    Delete: boolean;
    Admin: boolean;
    Modify: boolean;
    CdBurner: boolean;
    AutoRouting: boolean;
    ReadAll: boolean;
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
            console.log(state.role)
            console.log(state.role?.Name)
            console.log(action.payload)
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
