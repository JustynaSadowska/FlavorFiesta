import { Box } from '@mui/material'
import AllergensSection from './AllergensSection'
import PhotoSection from './PhotoSection'

export default function SettingsPage() {
  return (
   <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={3}
    >
      <Box width="100%" maxWidth={900}>
        <Box mb={2}>
          <AllergensSection />
        </Box>
        <Box mb={2}>
          <PhotoSection />
        </Box>
      </Box>

    </Box>
  )
}
