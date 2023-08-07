import { Dispatch, SetStateAction, createContext } from "react";

export type Card = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
};

type ContextProps = {
  cardList: Card[];
  setCardList: Dispatch<SetStateAction<Card[]>>;
};

// ユーザータイムのコンテキスト
export const UserCardListContext = createContext<ContextProps>({
  cardList: [],
  setCardList: () => {},
});
