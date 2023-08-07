import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { useState } from "react";
import Sea10DataTimePicker from "../src/DataPicker";
import { Card, UserCardListContext } from "./useinfo";
import TaskTable from "../src/Table";
import "./App.css";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const board = {
  columns: [
    {
      id: 0,
      title: "やりたいタスク",
      cards: [
        {
          id: 0,
          title: "かんばんボードを追加する",
          description: "neko",
          date: "2022/11/22 00:00:00",
          time: "2023/08/15 12:00:00",
        },
      ],
    },
    {
      id: 1,
      title: "タスク",
      cards: [],
    },
    {
      id: 2,
      title: "進行中",
      cards: [],
    },
    {
      id: 3,
      title: "完了",
      cards: [],
    },
  ],
};

function App() {
  dayjs.extend(timezone);
  dayjs.extend(utc);

  const [cardList, setCardList] = useState<Card[]>([]);

  return (
    <>
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: "15px",
          marginTop: "50px",
          marginBottom: "60px",
        }}
      >
        Sea10's Task Manager
      </h1>
      <UserCardListContext.Provider value={{ cardList, setCardList }}>
        <TaskTable cardList={cardList} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Board
            initialBoard={board}
            allowAddCard={{ on: "top" }}
            allowRemoveCard
            disableColumnDrag
            onNewCardConfirm={(draftCard: any) => ({
              id: new Date().getTime(),
              date: "",
              time: dayjs().format("YYYY/MM/DD HH:mm:ss"),
              ...draftCard,
            })}
            onCardNew={(e) => setCardList(e.columns[1].cards)}
            renderCard={(card: Card) => {
              return (
                <>
                  <Sea10DataTimePicker selectCard={card} />

                  <div
                    style={{
                      border: "1px solid gray",
                      borderRadius: "2px",
                      position: "relative",
                      padding: 5,
                      width: "250px",
                      margin: "10px",
                    }}
                  >
                    <div>
                      <span>{card.title}</span>
                      <div style={{ fontSize: "10px", color: "gray" }}>
                        {card.date} {card.time}
                      </div>
                      <button
                        style={{ position: "absolute", right: -2, top: -2 }}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                    <span>{card.description}</span>
                  </div>
                </>
              );
            }}
          />
        </div>
      </UserCardListContext.Provider>
    </>
  );
}

export default App;
