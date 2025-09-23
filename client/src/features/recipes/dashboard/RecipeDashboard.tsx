import { Grid2} from '@mui/material'
import RecipeList from './RecipeList'
import { useRecipes } from '../../../lib/hooks/useRecipes'
import RecipeFilters from './RecipeFilters';

export default function RecipeDashboard() {
 const {recipesGroup, isLoading} = useRecipes();
 const handleFiltersChange = (filters: unknown) => {
    console.log("Selected filters:", filters);
  };
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8} offset={{ xs:2, md: 2 }}>
         <RecipeFilters onFilterChange={handleFiltersChange} />
        </Grid2>
        <Grid2 size ={12} offset={{ md: 1,  xs:2,}}>
          <RecipeList recipesGroup={recipesGroup} isLoading={isLoading} />
        </Grid2>
        
    </Grid2>
  )
}
