import { Box } from '@mui/material'
import AllergensSection from './AllergensSection'

export default function SettingsPage() {
  return (
   <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={3}
      mt={4}
    >
      <Box width="100%" maxWidth={900}>
        <AllergensSection />
      </Box>
            
    </Box>
  )
}
