// USER
export const userColumns = [
  // { field: "id", headerName: "ID", width: 180 },
  {
    field: "image",
    headerName: "Ảnh",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {/* {params.row.image} */}
        </div>
      );
    },
  },
  {
    field: "lastName",
    headerName: "Họ",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "phoneNum",
    headerName: "Điện thoại",
    width: 200,
  },
  {
    field: "idCard",
    headerName: "ID thẻ",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "fireBaseId",
    headerName: "fireBase ID",
    width: 200,
  },
  {
    field: "dateOfBirth",
    headerName: "Ngày sinh",
    width: 150,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 80,
  },
  {
    field: "totalRate",
    headerName: "Tổng đánh giá",
    width: 110,
  },
  {
    field: "numOfRate",
    headerName: "Số đánh giá",
    width: 100,
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 100,
  },
  {
    field: "userWalletDTO",
    headerName: "Ví",
    width: 280,
    renderCell: (params) => {
      return (
        <div>
          {/* <div>ID: {params.row.userWalletDTO.id} /</div> */}
          <div>Tiền: {params.row.userWalletDTO.balance}</div>
        </div>
      );
    },
  },
];

//BOOK
export const bookColumns = [
  { field: "id", headerName: "ID", width: 180 },
  {
    field: "image",
    headerName: "Ảnh sách",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="book" />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Tên sách",
    width: 230,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "publisher",
    headerName: "Nhà xuất bản",
    width: 200,
  },
  {
    field: "year",
    headerName: "Năm xuất bản",
    width: 200,
  },
  {
    field: "isbn",
    headerName: "ISBN",
    width: 230,
  },
  {
    field: "pageCount",
    headerName: "Số trang",
    width: 150,
  },
  {
    field: "authors",
    headerName: "Tác giả",
    width: 230,
    renderCell: (params) => {
      const authors = params.row.authors.flat(); // Làm phẳng mảng lồng
      return (
        <div className="cellAuthors">
          {authors.map((author, index) => (
            <span key={index}>{author}</span>
          ))}
        </div>
      );
    },
  },
  {
    field: "mainCategory",
    headerName: "Thể loại chính",
    width: 230,
  },
  {
    field: "subCategory",
    headerName: "Thể loại phụ",
    width: 200,
  },
  {
    field: "subSubCategory",
    headerName: "Thể loại chi tiết",
    width: 180,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "newPercent",
    headerName: "Độ mới",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 120,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//ORDER
export const orderColumns = [
  { field: "id", headerName: "ID", width: 200 },

  {
    field: "senderPrice",
    headerName: "Giá gửi",
    width: 150,
  },

  {
    field: "receiverPrice",
    headerName: "Giá nhận",
    width: 150,
  },
  {
    field: "bookPrice",
    headerName: "Giá sách",
    width: 150,
  },
  {
    field: "senderShipPrice",
    headerName: "Tiền vận chuyển của người gửi",
    width: 150,
  },
  {
    field: "receiverShipPrice",
    headerName: "Tiền vận chuyển của người nhận",
    width: 150,
  },
  {
    field: "fee",
    headerName: "Phí",
    width: 100,
  },
  {
    field: "note",
    headerName: "Ghi chú",
    width: 200,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 200,
  },
  {
    field: "district",
    headerName: "Quận/Huyện",
    width: 200,
  },
  {
    field: "startShipDate",
    headerName: "Ngày bắt đầu giao hàng",
    width: 170,
  },
  {
    field: "finishShipDate",
    headerName: "Ngày kết thúc giao hàng",
    width: 170,
  },
  {
    field: "createDate",
    headerName: "Ngày tạo đơn",
    width: 150,
  },
  {
    field: "orderStatus",
    headerName: "Trạng thái đơn",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWith ${params.row.orderStatus}`}>
          {params.row.orderStatus}
        </div>
      );
    },
  },
];

// POST-
export const postColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "caption",
    headerName: "Đầu đề",
    width: 120,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 120,
  },
  {
    field: "exchangeMethod",
    headerName: "Phương thức trao đổi",
    width: 140,
  },
  {
    field: "createDate",
    headerName: "Ngày tạo",
    width: 120,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 150,
  },
  {
    field: "district",
    headerName: "Quận/Huyện",
    width: 120,
  },
  {
    field: "createBy",
    headerName: "Tạo bởi",
    width: 130,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.postStatus}`}>
          {params.row.postStatus}
        </div>
      );
    },
  },
];
