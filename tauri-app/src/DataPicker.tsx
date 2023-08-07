import { ComponentProps, useContext, useState } from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Card, UserCardListContext } from "./useinfo";
import * as dayjs from "dayjs";

interface Sea10DateTimePickerProps extends ComponentProps<"div"> {
  selectCard: Card;
}

export default function Sea10DateTimePicker({
  selectCard,
  ...props
}: Sea10DateTimePickerProps) {
  const { cardList, setCardList } = useContext(UserCardListContext);

  // propsで受け取れるselectCard(renderCardで受け取れるprops)は、値の変更を検知してくれないのでuseStateにそれを任せる
  const [time, setTime] = useState(selectCard.time);

  const handleChange = (selectTime: Dayjs | null) => {
    if (!selectTime) return;

    const res = cardList.map((card) => {
      // 「タスク」の中から変更したいカードを見つける
      if (card.id === selectCard.id) {
        // time だけを更新する
        return {
          ...selectCard,
          time: selectTime.format("YYYY/MM/DD HH:mm:ss"),
        };
      } else {
        // 一致していないものはそのままreturnする
        return card;
      }
    });

    setCardList(res);
    setTime(selectTime.format("YYYY/MM/DD HH:mm:ss"));
  };

  return (
    <div style={{ marginLeft: "10px" }} {...props}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker<Dayjs>
          renderInput={(props) => <TextField {...props} />}
          label="DeadLine"
          value={dayjs(time)}
          onChange={(selectTime: Dayjs | null) => handleChange(selectTime)}
        />
      </LocalizationProvider>
    </div>
  );
}
