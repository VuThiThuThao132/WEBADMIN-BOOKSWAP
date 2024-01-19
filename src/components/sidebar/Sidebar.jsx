import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookIcon from '@mui/icons-material/Book';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CategoryIcon from '@mui/icons-material/Category';
import BookBeginningIcon from '@mui/icons-material/MenuBook';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const { currentUser, dispatch: authDispatch } = useContext(AuthContext); // Lấy dispatch từ AuthContext
  const handleLogout = async () => {
    try {

      authDispatch({ type: 'Đăng xuất' });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>

          <span className="logo">BOOKSWAP</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <p className="title">MAIN</p> */}
          {/* <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li> */}
          <li onClick={() => navigate('/')}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">Quản lí</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Sách</span>
            </li>
            <ul style={{ marginLeft: "10px" }}>
              <Link to="/category" style={{ textDecoration: "none" }}>
                <li>
                  <CategoryIcon className="icon" />
                  <span>Thể loại</span>
                </li>
              </Link>
              <Link to="/books/book-beginning" style={{ textDecoration: "none" }}>
                <li>
                  <BookBeginningIcon className="icon" />
                  <span>Đầu sách</span>
                </li>
              </Link>
            </ul>
          </Link>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <li>
              <PostAddIcon className="icon" />
              <span>Bài đăng</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Đơn hàng</span>
            </li>
          </Link>

          {/* <p className="title">USEFUL LINKS</p>
          <li>
            <AnalyticsIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p> */}
          {/* <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li> */}
          {/* <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Settings</span>
          </li> */}
          {/* <p className="title">Người dùng</p> */}
          {/* <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
          {currentUser && (
            <li onClick={handleLogout}>
              <InputOutlinedIcon className="icon" />
              <span>Đăng xuất</span>
            </li>
          )}
        </ul>

      </div>
      <div className="bottom">
        <div className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}>
        </div>

        <div className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}>
        </div>

      </div>
    </div>
  )
}

export default Sidebar
