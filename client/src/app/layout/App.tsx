import {Container, CssBaseline, Typography} from "@mui/material";
import { useState } from "react"
import NavBar from "./NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import { useRecipes } from "../../lib/hooks/useRecipes";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {recipes, isPending} = useRecipes();
  
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(recipes!.find(x => x.id === id));
  }

  const handleCancelSelectedRecipe = () => {
    setSelectedRecipe (undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectRecipe (id);
    else handleCancelSelectedRecipe();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  return (
    <>
    <CssBaseline/>
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt: 3}}>
      {!recipes || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <RecipeDashboard 
            recipes = {recipes}
            selectRecipe={handleSelectRecipe}
            cancelSelectedRecipe= {handleCancelSelectedRecipe}
            selectedRecipe={selectedRecipe}
            editMode = {editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            />
      )}
      
    </Container>
    </>
  )
}

export default App
