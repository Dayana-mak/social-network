import { useState } from "react";
import styles from "./paginator.module.css";

const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChange,
  portionSize = 10,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
  let rightPortionPageNumber = portionNumber * pageSize;

  const onNextClick = () => {
    setPortionNumber(portionNumber + 1);
  }

  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <span
            key={p}
            className={`${currentPage === p && styles.selectedPage} ${styles.pageNum}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </span>
        ))}

      {portionNumber < portionsCount && (
        <button onClick={onNextClick}>
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
