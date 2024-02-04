import { PayloadAction } from "@reduxjs/toolkit";
import { URLS } from "../../../constants";
import { TPayload } from "../sagas";

export const getGitHubApi = (action: PayloadAction<TPayload>) => {
    const url = action.payload.searchValue;
    const match = url.match(URLS.regExp);
    const repo1 = match ? match[1] : "";
    const repo2 = match ? match[3] : "";
    const repo3 = match ? match[4] : "";

    let apiUrl = `${URLS.getAllIssues}${repo1}`;
    if (repo2) {
      apiUrl += `/${repo2}`;
    }
    if (repo3) {
      apiUrl += `/${repo3}`;
    }
    console.log(apiUrl)
    return apiUrl
}