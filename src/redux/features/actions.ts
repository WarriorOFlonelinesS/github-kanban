import { createAction } from "@reduxjs/toolkit";

export const GET_ALL_ISSUES = "issues/getAllIssuesSaga";
export const getAllIssues = createAction(
  GET_ALL_ISSUES,
  (payload: { searchValue: string }) => ({
    payload,
  })
);