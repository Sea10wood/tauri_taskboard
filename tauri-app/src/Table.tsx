import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card } from "./useinfo";

interface TaskTableProps {
  cardList: Card[];
}
export default function TaskTable({ cardList }: TaskTableProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "40px" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "90vw", textAlign: "center" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                直近のタスク
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                DeadLine
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                残り時間
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardList.map((card) => (
              <TableRow key={card.id}>
                <TableCell align="center">{card.title}</TableCell>
                <TableCell align="center">{card.time}</TableCell>
                <TableCell align="center">{card.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
