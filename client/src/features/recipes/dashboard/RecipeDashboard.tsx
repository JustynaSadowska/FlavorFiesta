import { Grid2} from '@mui/material'
import RecipeList from './RecipeList'
import { useRecipes } from '../../../lib/hooks/useRecipes'
import RecipeFilters from './RecipeFilters';
import { observer } from 'mobx-react-lite';

const RecipeDashboard= observer (function RecipeDashboard() {
 const {recipesGroup, isLoading, hasNextPage, fetchNextPage} = useRecipes();
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8} offset={{ xs:2, md: 2 }}>
         <RecipeFilters/>
        </Grid2>
        <Grid2 size ={12} offset={{ md: 1,  xs:2,}}>
          <RecipeList recipesGroup={recipesGroup} isLoading={isLoading} fetchNextPage={fetchNextPage} 
              hasNextPage={hasNextPage}  />
        </Grid2>
        
    </Grid2>
  )
});
export default RecipeDashboard;
