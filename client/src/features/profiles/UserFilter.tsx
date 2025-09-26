import { Paper, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../lib/hooks/useStore';

const UserFilter = observer (function UserFilter() {const {profileStore: {name, setName}} = useStore();

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
     <TextField
            label="Search by user name"
            variant="outlined"
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          /></Paper>
  )
});
export default UserFilter;
