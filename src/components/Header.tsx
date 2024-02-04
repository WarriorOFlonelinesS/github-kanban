import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getAllIssuesRequest } from "../redux/issues/reducer";
import { Alert } from "antd";
import Search from "antd/es/input/Search";
import { RepoInfo } from "./RepoInfo";
import { TEvent } from "./types";
import { parseRepoUrl } from "../redux/issues/urlHelpers/parseRepoUrl";
import { Links } from "./Links";

export const Header = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const { repo1, repo2, repo3 } = parseRepoUrl(searchValue);

    const sendUrl = (_: string, e: TEvent) => {
        e?.preventDefault();
        if (searchValue.trim() === "") {
            setError(true);
        } else {
            dispatch(getAllIssuesRequest({ searchValue: searchValue }));
            setError(false);
        }
    };

    return (
        <div className="header">
            <div className="container">
                <form className="header-form">
                    <Search
                        placeholder="Enter repo URL"
                        allowClear
                        enterButton="Load issues"
                        size="large"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={sendUrl}
                    />
                </form>
                {error && <Alert message="Invalid input!" type="error" />}
                <div className="navigation">
                    <Links repo1={repo1} repo2={repo2} repo3={repo3} />
                    <RepoInfo />
                </div>
            </div>
        </div>
    );
};

export default Header;
