import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { useEffect, useState } from 'react';
import Sea10DataTimePicker from '../src/DataPicker';

import { UserTimeContext, UserTitleContext, useUserTime, useUserTitle } from './useinfo';

import TaskTable from '../src/Table';
import './App.css';


const board = {
  columns: [
    {
      id: 0,
      list: 'やりたいタスク',

      cards: [
        {
          id: 0,
          title: 'かんばんボードを追加する',
          description: 'neko',
          // date: "2022/11/22 00:00:00",
          // time: "2023/08/15 12:00:00",
        },
      ]
    },
    {
      id: 1,
      list: 'タスク',
      cards: []
    },
    {
      id: 2,
      list: '進行中',
      cards: []
    },
    {
      id: 3,
      list: '完了',
      cards: []
    }
  ]
}

function App() {
  const title = useUserTitle();
  const time = useUserTime();
  const userTitle = "Some User Title";
  const userTime = "Some User Time";
  const [cards, setCards] = useState(board.columns[1].cards);
  const handleCardNew = (newCard: {
    id: number;
    list: string;
    title: string;
    description: string;
    date: string;
    time: string;
  }) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };
  const handleCardRemove = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  useEffect(() => {
    console.log("cards", cards)
  }, [cards])



  return (
    <>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'left', marginLeft: '15px', marginTop: '50px', marginBottom: '60px', }}>Sea10's Task Manager</h1>
      <UserTitleContext.Provider value={userTitle}>
        <UserTimeContext.Provider value={userTime}>
          <TaskTable cards={cards} title={title} time={time} onCardRemove={handleCardRemove} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Board
              initialBoard={board}
              allowAddCard={{ on: "top" }}
              allowRemoveCard
              disableColumnDrag
              onNewCardConfirm={(draftCard: any) => ({
                id: new Date().getTime(),
                ...draftCard
              })}
              onCardNew={(e) =>setCards(e.columns[1].cards)}
              onCardDragEnd={(event: any) => console.log("event", event)}
              onCardRemove={() =>console.log("success")}
              renderCard={(props: any) => (
                <>
                  <Sea10DataTimePicker onCardNew={handleCardNew} />
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
                      <span >
                        {props.title}
                      </span>
                      {/* <div style={{ fontSize: "10px", color: "gray" }}>
                        {props.date} {props.time}
                      </div> */}
                      <button
                        style={{ position: "absolute", right: -2, top: -2 }}
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                    <span>{ props.Time}</span>
                    <span>{props.description}</span>
                  </div>
                </>
              )}
            />
          </div>
        </UserTimeContext.Provider>
      </UserTitleContext.Provider>
    </>
  );
}

export default App;
