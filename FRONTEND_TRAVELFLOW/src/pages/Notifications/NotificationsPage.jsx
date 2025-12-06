import { Box, Typography } from '@mui/material';
import NotificationCenter from '../../components/NotificationCenter';

export default function NotificationsPage() {
  return (
    <Box>
      <NotificationCenter compact={false} />
    </Box>
  );
}
