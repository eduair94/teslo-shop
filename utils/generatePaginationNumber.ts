export const generatePaginationNumber = (
  currentPage: number,
  totalPages: number,
) => {
  // If the total number of pages is 7 or less, show without dots.
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  // If the current page is in the first 3 pages, show the first 3 pages, dots and then the last two
  if (currentPage <= 3) return [1, 2, 3, '...', totalPages - 1, totalPages];

  //If the current pages is in the last 3 pages, we want to show the first two , dots and then the last three
  if (currentPage > totalPages - 3)
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];

  // If the current page is in other place, we want to show the first page, dots and the current page, dots
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
