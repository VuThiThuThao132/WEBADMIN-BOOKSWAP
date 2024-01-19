import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axiosInstance from "../../utils/axiosInstance";

const UserDatatable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const requestBody = {
          page: 0,
          size: 6,
          sortBy: 'firstName',
          sortOrder: 'desc',
        };

        const response = await axiosInstance.post(
          'https://bookswapplatform.site/bookswap/api/v1/admin/user/filter',
          requestBody,

        );

        if (response.status === 200) {
          const result = response.data;
          const adjustedData = result.data.map((item) => {
            return {
              id: item.id,
              lastName: item.lastName || 'NULL',
              firstName: item.firstName || 'NULL',
              phoneNum: item.phoneNum || 'NULL',
              idCard: item.idCard || 'NULL',
              email: item.email || 'NULL',
              fireBaseId: item.fireBaseId || 'NULL',
              dateOfBirth: item.dateOfBirth || 'NULL',
              gender: item.gender || 'NULL',
              image: item.image || 'NULL',
              totalRate: item.totalRate || '0',
              numOfRate: item.numOfRate || '0',
              userWalletDTO: {
                id: item.userWalletDTO.id || 'NULL',
                balance: item.userWalletDTO.balance || 'NULL',
              },
            };
          });

          setData(adjustedData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    const filtered = data.filter((item) => (
      item.firstName.toLowerCase().includes(value.toLowerCase()) ||
      item.lastName.toLowerCase().includes(value.toLowerCase()) ||
      item.phoneNum.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase())
    ));

    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              Xem
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xóa
            </div>

          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Người dùng
        <div className="search">
          <div className="searchIcon">
            <SearchOutlinedIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Tìm kiếm người dùng..."
          />
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={filteredData.length > 0 ? filteredData : data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default UserDatatable;