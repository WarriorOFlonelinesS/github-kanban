import { StarOutlined, EyeOutlined, BranchesOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { getRepoInfo } from "../redux/issues/selectors";

export const RepoInfo = () => {
    const repoInfo = useSelector(getRepoInfo);

    if (!repoInfo) {
        return <div>Loading...</div>;
    }
    return (
        <div className="repo-info">
            <div className="repo-info-item">
                <StarOutlined />
                <p className="repo-info-text">Stars {Number(repoInfo.stargazers_count) >= 1000
                        ? `${(Number(repoInfo.stargazers_count) / 1000).toFixed(1)}k`
                        : repoInfo.stargazers_count
                    }</p>
            </div>
            <div className="repo-info-item">
                <EyeOutlined />
                <p className="repo-info-text">
                    Watch {Number(repoInfo.watchers_count) >= 1000
                        ? `${(Number(repoInfo.watchers_count) / 1000).toFixed(1)}k`
                        : repoInfo.watchers_count
                    }
                </p>
            </div>
            <div className="repo-info-item">
                <BranchesOutlined />
                <p className="repo-info-text">Fork  {Number(repoInfo.forks_count) >= 1000
                    ? `${(Number(repoInfo.forks_count) / 1000).toFixed(1)}k`
                    : repoInfo.forks_count}
                </p>
            </div>
        </div>
    );
};
