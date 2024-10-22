/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Chuyển Date thành mili-giây và chia cho 1000 để thành giây (Epoch time)
 */
function changeDateToEpoch(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}
