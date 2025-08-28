import { Grid2} from '@mui/material'
import RecipeList from './RecipeList'
import { useRecipes } from '../../../lib/hooks/useRecipes'

export default function RecipeDashboard() {
 const {recipes, isLoading} = useRecipes();
  return (
    <Grid2 container spacing={3}>
        <Grid2 size = {12}>
        <RecipeList recipes={recipes} isLoading={isLoading} />
        </Grid2>
        <Grid2 size={5}>
          Recipe filters go here
        </Grid2>
    </Grid2>
  )
}
