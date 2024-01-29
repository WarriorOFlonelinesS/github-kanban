export default function Main() {
    return (
        <div className="main">
            <div className="container">
                <div className="main-content">
                    <div className="column">
                        <p className="column__title">ToDo</p>
                        <div className="column-area">
                            <div className="column-item">
                                <p className="item__header">Some issue title</p>
                                <p className="item__text">#315 opened 3 days</p>
                                <p className="item__status">Admin | comments</p>
                            </div>
                            <div className="column-item">
                                <p className="item__header">Some issue title</p>
                                <p className="item__text">#315 opened 3 days</p>
                                <p className="item__status">Admin | comments</p>
                            </div>
                            <div className="column-item">
                                <p className="item__header">Some issue title</p>
                                <p className="item__text">#315 opened 3 days</p>
                                <p className="item__status">Admin | comments</p>
                            </div>
                            <div className="column-item">
                                <p className="item__header">Some issue title</p>
                                <p className="item__text">#315 opened 3 days</p>
                                <p className="item__status">Admin | comments</p>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <p className="column__title">In Progress</p>
                        <div className="column-area"></div>
                    </div>
                    <div className="column">
                        <p className="column__title">Done</p>
                        <div className="column-area"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}