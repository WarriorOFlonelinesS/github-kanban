import { PayloadAction } from "@reduxjs/toolkit";
import { URLS } from "../../../constants";
import { TPayload } from "../sagas";
import { getGitHubApi } from "./getGitHubApi";

export const getGitHubApiIssues = (action: PayloadAction<TPayload>) => {
  const gitHubApi = getGitHubApi(action);
  return gitHubApi + URLS.issuesEndpoint;
};
