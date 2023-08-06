import { createContext, useContext } from 'react';

// ユーザータイトルのコンテキスト
export const UserTitleContext = createContext<string | null>(null);

// ユーザータイムのコンテキスト
export const UserTimeContext = createContext<string | null>(null);

// カスタムフック: ユーザータイトルを取得
export function useUserTitle() {
  return useContext(UserTitleContext);
}

// カスタムフック: ユーザータイムを取得
export function useUserTime() {
  return useContext(UserTimeContext);
}
