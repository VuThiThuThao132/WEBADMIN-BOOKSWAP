// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register"
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
// import { userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";
// import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
// import BookList from "./pages/list/BookList";
// import { AuthContext } from "./context/AuthContext";
// import OrderList from "./pages/list/OrderList";
// import PostList from "./pages/list/PostList";
// import ViewOrder from "./pages/single/ViewOrder";
// import ViewPost from "./pages/single/ViewPost";
// import EditPost from "./pages/edit/EditPost";
// import EditUser from "./pages/edit/EditUser";
// import ViewBook from "./pages/single/ViewBook";
// import EditBook from "./pages/edit/EditBook";


// function App() {

//   const { darkMode } = useContext(DarkModeContext);

//   const { currentUser } = useContext(AuthContext);

//   const RequireAuth = ({ children }) => {
//     return currentUser ? (children) : <Navigate to="/login" />
//   }

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route path="login" element={<Login />} />
//             <Route index element={<RequireAuth> <Home /> </RequireAuth>} />

//             <Route path="register" element={<Register />} />
//             <Route path="users">
//               <Route index element={<RequireAuth><List /></RequireAuth>} />
//               <Route path=":userId" element={<RequireAuth> <Single /> </RequireAuth>} />
//               <Route path="new" element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>} />
//               <Route path=":userId/edit" element={<RequireAuth><EditUser /></RequireAuth>} />
//             </Route>
//             <Route path="books">
//               <Route index element={<RequireAuth><BookList /></RequireAuth>} />
//               <Route path=":bookId" element={<RequireAuth> <ViewBook /> </RequireAuth>} />
//               <Route path=":bookId/edit" element={<RequireAuth><EditBook /></RequireAuth>} />

//             </Route>
//             <Route path="orders">
//               <Route index element={<RequireAuth><OrderList /></RequireAuth>} />
//               <Route path=":orderId" element={<RequireAuth><ViewOrder /></RequireAuth>} />
//               {/* <Route path="new" element={<RequireAuth><New inputs={bookInputs} title="Add New Order" /></RequireAuth>} /> */}
//             </Route>
//             <Route path="posts">
//               <Route index element={<RequireAuth><PostList /></RequireAuth>} />
//               <Route path=":postId" element={<RequireAuth><ViewPost /></RequireAuth>} />
//               <Route path=":postId/edit" element={<RequireAuth><EditPost /></RequireAuth>} />

//               {/* <Route path="new" element={<RequireAuth><New inputs={bookInputs} title="Add New Post" /></RequireAuth>} /> */}
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import Home from "./pages/home/Home";
// import New from "./pages/new/New";
// import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./pages/list/BookList";
import OrderList from "./pages/list/OrderList";
import PostList from "./pages/list/PostList";
import ViewOrder from "./pages/view/ViewOrder";
import ViewPost from "./pages/view/ViewPost";
import EditPost from "./pages/edit/EditPost";
import EditUser from "./pages/edit/EditUser";
import ViewBook from "./pages/view/ViewBook";
import EditBook from "./pages/edit/EditBook";
import NewPost from "./pages/new/Post/NewPost";
import ViewPostDetail from "./pages/ViewDetail/ViewPostDetail";
import ViewUser from "./pages/view/ViewUser";
import UserList from "./pages/list/UserList";
import Category from "./pages/view/Book/Category";
import AddCategory from "./pages/view/Book/Add/AddCategory";
import Login from "./pages/login/Login";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<ViewUser />} />
            {/* <Route path="new" element={<New inputs={userInputs} title="Add New User" />} /> */}
            <Route path=":userId/edit" element={<EditUser />} />
          </Route>
          <Route path="books">
            <Route index element={<BookList />} />
            <Route path=":bookId" element={<ViewBook />} />
            <Route path=":bookId/edit" element={<EditBook />} />
          </Route>
          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path=":orderId" element={<ViewOrder />} />
          </Route>
          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":postId" element={<ViewPost />} />
            <Route path=":postId/viewDetail" element={<ViewPostDetail />} />
            <Route path="newPost" element={<NewPost />} />
            <Route path=":postId/edit" element={<EditPost />} />
          </Route>
          {/* <Route path="/category" element={<Category />} /> */}
          <Route path="/category" element={<Category />}>
            <Route path="add" element={<AddCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
