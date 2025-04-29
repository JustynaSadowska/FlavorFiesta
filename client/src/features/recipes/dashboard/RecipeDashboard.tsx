import { Grid2} from '@mui/material'
import RecipeList from './RecipeList'

export default function RecipeDashboard() {

  return (
    <Grid2 container spacing={3}>
        <Grid2 size = {12}>
        <RecipeList />
        </Grid2>
        <Grid2 size={5}>
          Recipe filters go here
        </Grid2>
    </Grid2>
  )
}
