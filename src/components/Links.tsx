import { URLS } from "../constants"

type TProps = {
    repo1: string,
    repo2: string,
    repo3: string
}

export const Links = ({ repo1, repo2, repo3 }:TProps) => {
    return (
        <div  className='links'>
            <a href={`${URLS.gitBaseUrl}${repo1}`} className="navigation__link">
                {repo1}
            </a>
            {repo2 && (
                <>
                    <p className="navigation__arrow">&gt;</p>
                    <a href={`${URLS.gitBaseUrl}${repo1}/${repo2}`} className="navigation__link">
                        {repo2}
                    </a>
                </>
            )}
            {repo3 && (
                <>
                    <p className="navigation__arrow">&gt;</p>
                    <a href={`${URLS.gitBaseUrl}${repo1}/${repo2}/${repo3}`} className="navigation__link">
                        {repo3}
                    </a>
                </>
            )}
        </div>
    )
}