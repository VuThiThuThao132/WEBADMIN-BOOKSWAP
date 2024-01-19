import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import PostDatatable from "../../components/datatable/PostDatatable"

const PostList = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <PostDatatable />
            </div>
        </div>
    )
}

export default PostList
