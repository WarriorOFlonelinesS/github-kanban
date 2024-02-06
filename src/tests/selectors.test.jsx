import { getAllIssues } from "../redux/issues/selectors";

describe("redux selecotrs", () => {


  test("get all issues", () => {
    const issues = [{ title: "fix bags", state: "open", user: "Admin" }];
    result = getAllIssues({ issues });
    expect(result).toEqual(issues)
  });
});
