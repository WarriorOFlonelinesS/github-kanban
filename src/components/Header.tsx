import { link } from "fs";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { getAllIssues } from "../redux/features/actions";

export default function Header() {
    const dispatch = useAppDispatch()
    const sendUrl = (event:any)=>{
        event.preventDefault();
        if(searchValue !== ''){
            dispatch(getAllIssues({searchValue:searchValue}))
        }
        else{
        const erorr = new Error("Invalid input!")
        console.error(erorr)
        }
    }
    const [searchValue, setSearchValue ] = useState('')
    const url = searchValue;
    const match = url.match(/https:\/\/github\.com\/([^/]+)(\/([^/]+))?(\/([^/]+))?/);
    const repo1 = match ? match[1] : '';
    const repo2 = match ? match[3] : '';
    const repo3 = match ? match[4] : '';
    return (
        <div className="header">
            <div className="container">
                <form className="header-form">
                    <input className="header__input" type="text" placeholder="Enter repo URL" onChange={(e)=>setSearchValue(e.target.value)} />
                    <button className="header__btn" onClick={sendUrl}
                    >Load issues</button>
                </form>
                <div className="navigation">
                    <a href={`https://github.com/${repo1}`} className="navigation__link">{repo1}</a>
                    {repo2 && (
                        <>
                            <p className='navigation__arrow'>&gt;</p>
                            <a  href={`https://github.com/${repo1}/${repo2}`} className="navigation__link">{repo2}</a>
                        </>
                    )}
                         {repo3 && (
                        <>
                            <p className='navigation__arrow'>&gt;</p>
                            <a  href={`https://github.com/${repo1}/${repo2}/${repo3}`} className="navigation__link">{repo3}</a>
                        </>
                    )}
                    <div className="navigation-rating">
                        <img src="images/Star.svg" alt="" />
                        <p className="rating__text"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}