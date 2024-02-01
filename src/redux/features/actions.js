import { createAction } from "@reduxjs/toolkit";

export const GET_ISSUES = "movies/getIssuesSaga";
export const getIssues = createAction(GET_ISSUES);