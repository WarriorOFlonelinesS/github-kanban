import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getAllIssuesRequest } from "../redux/issues/reducer";
import { Alert } from "antd";
import Search from "antd/es/input/Search";

export const Header = () => {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState(false)
    const url = searchValue;
    const match = url.match(/https:\/\/github\.com\/([^/]+)(\/([^/]+))?(\/([^/]+))?/);
    const repo1 = match ? match[1] : "";
    const repo2 = match ? match[3] : "";
    const repo3 = match ? match[4] : "";

    const sendUrl = () => {
        if (searchValue.trim() === "") {
            setError(true)
        } else {
            dispatch(getAllIssuesRequest({ searchValue: searchValue }));
            setError(false)
        }
    };

    return (
        <div className="header">
            <div className="container">
                <form className="header-form">
                    <Search
                        placeholder="Enter repo URL"
                        allowClear
                        enterButton="Loading"
                        size="large"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={sendUrl}
                    />
                </form>
                {error && <Alert message="Invalid input!" type="error" />}
                <div className="navigation">
                    <a href={`https://github.com/${repo1}`} className="navigation__link">
                        {repo1}
                    </a>
                    {repo2 && (
                        <>
                            <p className="navigation__arrow">&gt;</p>
                            <a href={`https://github.com/${repo1}/${repo2}`} className="navigation__link">
                                {repo2}
                            </a>
                        </>
                    )}
                    {repo3 && (
                        <>
                            <p className="navigation__arrow">&gt;</p>
                            <a href={`https://github.com/${repo1}/${repo2}/${repo3}`} className="navigation__link">
                                {repo3}
                            </a>
                        </>
                    )}
                    <div className="navigation-rating">
                        <img src="images/Star.svg" alt="" />
                        <p className="rating__text"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
