/* eslint-disable prettier/prettier */

/**
 * Tách mã lỗi, thông báo lỗi của Oracle
 */
export function splitOracleError(errorMessage: string) {
  const splitMessage = errorMessage?.split(':');
  if (splitMessage?.length > 1) {
    const errorCode = splitMessage[0]?.trim();
    const errorDetails = splitMessage?.slice(1).join(':').trim();

    return {
      errorCode,
      errorDetails,
    };
  }

  return {
    errorCode: '',
    errorDetails: errorMessage,
  };
}
