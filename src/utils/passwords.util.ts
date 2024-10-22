/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
/**
 * So sánh băm
 */
export async function comparePasswords(
  enteredPassword: string,
  storedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, storedPassword);
}
