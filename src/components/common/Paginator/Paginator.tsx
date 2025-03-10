import { useState } from "react";
import styles from "./paginator.module.css";

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChange,
  portionSize = 10,
}) => {
  const pagesCount: number = Math.ceil(totalItemsCount / pageSize);

  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionsCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1;
  let rightPortionPageNumber = portionNumber * pageSize;

  const onNextClick = (): void => {
    setPortionNumber(portionNumber + 1);
  }

  const onPrevClick = ():void => {
    setPortionNumber(portionNumber - 1)
  }

  return (
    <div>
      {portionNumber > 1 && (
        <button onClick={onPrevClick}>
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
            className={`${currentPage === p ? styles.selectedPage : ""} ${styles.pageNum}`}
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
