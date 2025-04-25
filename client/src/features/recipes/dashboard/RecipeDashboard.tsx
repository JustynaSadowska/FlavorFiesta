import { Grid2} from '@mui/material'
import RecipeList from './RecipeList'
import RecipeDetails from '../details/RecipeDetails'
import RecipeForm from '../form/RecipeForm'

type Props = {
    recipes: Recipe[]
    selectRecipe: (id: string) => void
    cancelSelectedRecipe: () => void
    selectedRecipe?: Recipe
    openForm: (id: string) => void
    closeForm: () => void
    editMode: boolean
    submitForm: (recipe: Recipe) => void
    deleteRecipe: (id:string) => void 
}
export default function RecipeDashboard({
  recipes,
  cancelSelectedRecipe,
  selectedRecipe,
  selectRecipe,
  openForm,
  closeForm,
  editMode, 
  submitForm,
  deleteRecipe
}
  : Props) {
  return (
    <Grid2 container spacing={3}>
        <Grid2 size = {12}>
        <RecipeList 
          recipes={recipes}
          selectRecipe={selectRecipe}
          />
        </Grid2>
        <Grid2 size={5}>
          {selectedRecipe && !editMode &&
          <RecipeDetails
            recipe={selectedRecipe}
            cancelSelectedRecipe= {cancelSelectedRecipe} 
            openForm={openForm}
            deleteRecipe={deleteRecipe}/>
          }
          {editMode && <RecipeForm 
          closeForm={closeForm} 
          recipe={selectedRecipe} 
          submitForm = {submitForm}/>}
        </Grid2>
    </Grid2>
  )
}
