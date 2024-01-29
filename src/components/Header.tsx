export default function Header() {
    return (
        <div className="header">
            <div className="container">
                <form className="header-form">
                    <input className="header__input" type="text" placeholder="Enter repo URL" />
                    <button className="header__btn">Load issues</button>
                </form>
                <div className="navigation">
                    <a href="#" className="navigation__link">Facebook</a>
                    <p className='navigation__arrow'>&gt;</p>
                    <a href="#" className="navigation__link">React</a>
                    <div className="navigation-rating">
                        <img src="images/Star.svg" alt="" />
                        <p className="rating__text">194 K stars </p>
                    </div>
                </div>
            </div>
        </div>
    )
}