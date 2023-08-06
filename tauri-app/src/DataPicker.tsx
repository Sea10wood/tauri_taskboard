import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { UserTimeContext } from './useinfo';

export default function Sea10DateTimePicker({ setCards, ...props }) {
  const [time, setTime] = useState<Dayjs | null>(UserTimeContext);

  return (
    <div style={{ marginLeft: "10px" }}  {...props}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker<Dayjs>
          renderInput={(props: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...props} />}
          label="DeadLine"
          time={time}
          onChange={(newTime: Dayjs | null) => {
            setTime(newTime);
            console.log('userTime:', newTime?.format("YYYY:MM:DD"));
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
