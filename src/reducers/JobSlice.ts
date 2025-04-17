import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type JobState = {
  jobs: {jobId: string, jobType: JobType}[];
};

export type JobType = "processing" | "orthanc";

interface AddRemoveJobPayload {
  jobId: string;
  jobType?: JobType;
}

const initialState: JobState = {
  jobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob(state, action: PayloadAction<AddRemoveJobPayload>) {
      state.jobs.push({ jobId: action.payload.jobId, jobType: action.payload.jobType });
    },
    removeJob(state, action: PayloadAction<string>) {
      state.jobs = state.jobs.filter(
        (job) => job.jobId !== action.payload
      );
    },
  },
});
export const { addJob, removeJob } = jobSlice.actions;
export default jobSlice.reducer;
