import { PayloadAction } from "@reduxjs/toolkit";
import { URLS } from "../../../constants";
import { TPayload } from "../sagas";
import { parseRepoUrl } from "./parseRepoUrl";

export const getGitHubApi = (action: PayloadAction<TPayload>) => {
  const { repo1, repo2, repo3 } = parseRepoUrl(action.payload.searchValue);

  let apiUrl = `${URLS.getAllIssues}${repo1}`;
  if (repo2) {
    apiUrl += `/${repo2}`;
  }
  if (repo3) {
    apiUrl += `/${repo3}`;
  }
  return apiUrl;
};
