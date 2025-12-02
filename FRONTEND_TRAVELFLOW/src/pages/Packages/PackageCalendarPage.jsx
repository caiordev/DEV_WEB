import { Box, Typography } from '@mui/material';
import PackageCalendar from '../../components/common/PackageCalendar';

export default function PackageCalendarPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Calendário de Pacotes
      </Typography>
      <PackageCalendar />
    </Box>
  );
}
