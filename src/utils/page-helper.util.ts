/* eslint-disable prettier/prettier */
export const MAX_PER_PAGE = 50;

/**
 * Tính toán dựa theo giới hạn phần tử và số trang để đưa ra số trang bỏ qua
 */
export function paginateCalculator(pageNumber?: number, limit?: number) {
  const resPerPage = Number(limit ?? MAX_PER_PAGE);
  const currentPage = Number(pageNumber || 1);
  const passedItem = resPerPage * (currentPage - 1);
  return { resPerPage, currentPage, passedItem };
}

export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
