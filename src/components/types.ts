import { TIssue } from "../redux/issues/types";

export type TCurrentColumn = {
  title: string;
  data: Array<TIssue>;
  id: number;
};

export type TEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLInputElement>
  | undefined;
