import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type JobState = {
  jobIds: string[];
};

interface AddRemoveJobPayload {
  jobId: string;
}

const initialState: JobState = {
  jobIds: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob(state, action: PayloadAction<AddRemoveJobPayload>) {
      state.jobIds.push(action.payload.jobId);
    },
    removeJob(state, action: PayloadAction<AddRemoveJobPayload>) {
      state.jobIds = state.jobIds.filter(
        (jobId) => jobId !== action.payload.jobId
      );
    },
  },
});
export const { addJob, removeJob } = jobSlice.actions;
export default jobSlice.reducer;
