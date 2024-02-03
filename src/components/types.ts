import { TIssue } from "../redux/issues/types";

export type TCurrentColumn = {
  title: string;
  data: Array<TIssue>;
  id: number;
};
