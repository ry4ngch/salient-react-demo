import React, { useEffect, useState } from 'react';

/**
 * Pagination HOC
 * ----------------
 * This HOC supports:
 * - Dynamic tables (items array)
 * - Static tables (children as rows)
 * - Render-prop pattern (children as function)
 */
const withPagination = (config = {}) => (WrappedComponent) => {
  return ({
    items = [],
    itemsPerPage = config.itemsPerPage || 5,
    pageRange = config.pageRange || 4,
    showPageItemsControl = config.showPageItemsControl || false,
    children,
    ...props
  }) => {
    
    // CORE PAGINATION STATE (single source of truth)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsShownPerPage, setItemsShownPerPage] = useState(itemsPerPage);

   
    // DERIVED VALUES 
    // Total number of rows (dynamic or static)
    const totalItems =
      items.length > 0
        ? items.length
        : React.Children.count(children);

    // Always ensure at least 1 page
    const totalPages = Math.max(
      1,
      Math.ceil(totalItems / itemsShownPerPage)
    );

    const [pageLimit, setPageLimit] = useState({
      min: 1,
      max: Math.min(totalPages, pageRange),
    });

   
    // we use useEffect here so that pagination updates correctly when table data is filtered
    useEffect(() => {
      // If current page becomes invalid after recount, reset safely
      if (currentPage > totalPages) {
        setCurrentPage(1);
        return;
      }

      // Recalculate visible page window
      const offset = Math.floor(pageRange / 2);

      setPageLimit({
        min: Math.max(1, currentPage - offset),
        max: Math.min(totalPages, currentPage + offset),
      });
    }, [
      totalItems,
      itemsShownPerPage,
      totalPages,
      currentPage,
      pageRange,
    ]);

    // Dynamic table pagination
    const paginatedItems = items.slice(
      (currentPage - 1) * itemsShownPerPage,
      currentPage * itemsShownPerPage
    );

    const updateItemsShownPerPage = (e) => {
      const value = parseInt(e.target.value, 10);

      // Guard against invalid input
      if (!value || value < 1 || value > totalItems) return;

      setItemsShownPerPage(value);
    };

    const updatePageItemCount = (action) => {
      setItemsShownPerPage((prev) => {
        if (action === 'add') {
          return Math.min(prev + 1, totalItems);
        }
        return Math.max(prev - 1, 1);
      });
    };

    const goToPage = (page) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    };

    const togglePage = (direction) => {
      setCurrentPage((prev) => {
        const next =
          direction === 'prev' ? prev - 1 : prev + 1;
        return Math.min(Math.max(next, 1), totalPages);
      });
    };

    const renderChildren = () => {
      // Render-prop pattern
      if (typeof children === 'function') {
        return children(paginatedItems);
      }

      // Static table pagination
      const rows = React.Children.toArray(children);

      return rows.slice(
        (currentPage - 1) * itemsShownPerPage,
        currentPage * itemsShownPerPage
      );
    };

    const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsShownPerPage + 1;
    const end = Math.min(currentPage * itemsShownPerPage, totalItems);

    return (
      <div>
        <WrappedComponent
          {...props}
          items={paginatedItems}
          data={items.length > 0 ? items : React.Children.toArray(children)}
          itemsPerPage={itemsShownPerPage}
          currentPage={currentPage}
        >
          {renderChildren()}
        </WrappedComponent>

        {/* Pagination Footer */}
        <div className="pagination-footer">
          <span className="pagination-detail">
            <p className="pagination-info">
              {`Showing ${start} to ${end} of ${totalItems} entries`}
            </p>

            {showPageItemsControl && (
              <div className="pagecount-wrapper">
                <div className="pagecount-data">
                  <input
                    className="pagination-pagecount"
                    type="number"
                    min={1}
                    max={totalItems}
                    value={itemsShownPerPage}
                    onChange={updateItemsShownPerPage}
                  />
                  <span>Rows Per Page</span>
                </div>

                <div className="pagecount-controls">
                  <span
                    className="input-button add"
                    onClick={() => updatePageItemCount('add')}
                  >
                    +
                  </span>
                  <span
                    className="input-button remove"
                    onClick={() => updatePageItemCount('remove')}
                  >
                    -
                  </span>
                </div>
              </div>
            )}
          </span>

          {/* Pagination Controls */}
          <nav className="pagination-container">
            <ul className="pagination">
              <li
                onClick={() => togglePage('prev')}
                className={currentPage === 1 ? 'disabled' : ''}
              >
                <span>
                  <i className="icon icon-left" />
                  <span className="sr-only">(previous)</span>
                </span>
              </li>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                if (page < pageLimit.min || page > pageLimit.max) {
                  return null;
                }

                return (
                  <li
                    key={page}
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => goToPage(page)}
                  >
                    <span>{page}</span>
                  </li>
                );
              })}

              <li
                onClick={() => togglePage('next')}
                className={currentPage === totalPages ? 'disabled' : ''}
              >
                <span>
                  <i className="icon icon-right" />
                  <span className="sr-only">(next)</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };
};

export default withPagination;
