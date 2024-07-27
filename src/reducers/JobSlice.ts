import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// jobsSlice.ts

export interface JobState {
  jobId: string | null;
  entityId: string | null;
  entityType: 'patient' | 'study' | 'series' | null;
  isSubmitted: boolean;
  isCompleted: boolean;
}

const initialState: JobState = {
  jobId: null,
  entityId: null,
  entityType: null,
  isSubmitted: false,
  isCompleted: false,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<{ jobId: string; entityId: string; entityType: 'patient' | 'study' | 'series' }>) => {
      console.log('Action payload:', action.payload);

      state.jobId = action.payload.jobId;
      state.entityId = action.payload.entityId;
      state.entityType = action.payload.entityType;
      state.isSubmitted = true;
      state.isCompleted = false;
    },
    setJobCompleted: (state) => {
      console.log('Inside setJobCompleted', state);
      state.isCompleted = true;
    },
    resetJob: () => initialState,
  },
});

export const { setJob, setJobCompleted, resetJob } = jobSlice.actions;
export default jobSlice.reducer;