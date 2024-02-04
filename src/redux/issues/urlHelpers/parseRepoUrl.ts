import { URLS } from "../../../constants";

export const parseRepoUrl = (url: string) => {
  const match = url.match(URLS.regExp);
  const repo1 = match ? match[1] : "";
  const repo2 = match ? match[3] : "";
  const repo3 = match ? match[4] : "";
  return { repo1, repo2, repo3 };
};
