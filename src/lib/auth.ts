import bcrypt from "bcryptjs";

const PEPPER = process.env.PASSWORD_PEPPER;
const SALT_ROUNDS = 12;

/**
 * パスワードをハッシュ化する（ペッパー + ソルト）
 * @param password
 * @returns
 */
export async function hashPassword(password: string): Promise<string> {
  const pepperedPassword = password + PEPPER;
  return bcrypt.hash(pepperedPassword, SALT_ROUNDS);
}

/**
 * パスワードを検証する
 * @param password
 * @param hashedPassword
 * @returns
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const pepperedPassword = password + PEPPER;
  return bcrypt.compare(pepperedPassword, hashedPassword);
}
