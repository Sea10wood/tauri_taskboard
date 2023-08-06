import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export default function TaskTable({ cards }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "40px" }}>
      <TableContainer component={Paper} sx={{ width: "90vw", textAlign: "center" }}>
        <Table sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "28px", fontWeight: "bold", textAlign: 'center' }}>直近のタスク</TableCell>
              <TableCell sx={{ fontSize: "28px", fontWeight: "bold", textAlign: 'center' }}>DeadLine</TableCell>
              <TableCell sx={{ fontSize: "28px", fontWeight: "bold", textAlign: 'center' }}>残り時間</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.userTime}</TableCell>
                <TableCell align="center">{row.remainingTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
