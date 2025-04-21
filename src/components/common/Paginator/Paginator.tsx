import { Pagination } from "@mui/material";

type PropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);

  return (
    <Pagination
      count={pagesCount}
      siblingCount={4}
      boundaryCount={1}
      shape="rounded"
      page={currentPage}
      onChange={(_, num) => onPageChange(num)}
      size="large"
      sx={{
        "& .MuiPaginationItem-root": {
          color: "#1C1C1E", // цвет текста обычных кнопок
          borderColor: "#dcdcdc",
          backgroundColor: "#e0e0e0",
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "#d0d0d0", // при наведении
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          color: "#fff", // цвет текста активной кнопки
          backgroundColor: "#617BFF", // цвет фона активной кнопки
          borderColor: "#617BFF",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
          backgroundColor: "#4f65d4", // цвет при наведении на активную
        },
        "& .MuiPaginationItem-ellipsis": {
          backgroundColor: "transparent",
          pointerEvents: "none", // отключить hover-эффекты
        },
      }}
    />
  );
};

export default Paginator;
