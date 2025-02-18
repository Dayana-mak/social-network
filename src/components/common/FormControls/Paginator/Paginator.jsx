import styles from "./paginator.module.css"

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChange}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
  
    return (
      <div>
        {pages.map(pageNum => (
          <span key={pageNum} className={`${currentPage === pageNum && styles.selectedPage} ${styles.pageNum}`}
          onClick={() => onPageChange(pageNum)}>{pageNum} </span>
        ))}
      </div>
    )
}

export default Paginator;