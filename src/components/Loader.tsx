import { Spin } from "antd"

export const Loader = () => {
    return (
        <div className="loader">
            <Spin tip="Issues are loading" size="large">
                <div className="content" />
            </Spin>
        </div>
    )
}