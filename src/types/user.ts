/**
 * ユーザーの基本情報
 * アバター+名前+accountIdの表示で使用する最小限のユーザー情報
 */
export type UserBasicInfo = {
  userId: string;
  accountId: string;
  name: string;
  profileImageUrl: string | null;
};
