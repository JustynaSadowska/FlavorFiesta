import {Container, CssBaseline} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Recipe[]>('https://localhost:5001/api/recipes')
      .then(response => setRecipes(response.data))
      return() => {}
  },[])
  
  const handleSelectRecipe = (id: string) => {
    setSelectedRecipe(recipes.find(x => x.id === id));
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

  const handleSubmitForm = (recipe: Recipe) => {
    if(recipe.id) {
      setRecipes(recipes.map(x => x.id === recipe.id ? recipe : x))
    } else {
      const newRecipe = {...recipe, id: recipes.length.toString()}
      setSelectedRecipe(newRecipe)
      setRecipes([...recipes, newRecipe])
    }
    setEditMode(false);
  }

const handleDeleteRecipe = (id: string) => {
  setRecipes(recipes.filter(x => x.id !== id))
  handleCancelSelectedRecipe();
}

  return (
    <>
    <CssBaseline/>
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt: 3}}>
      <RecipeDashboard 
        recipes = {recipes}
        selectRecipe={handleSelectRecipe}
        cancelSelectedRecipe= {handleCancelSelectedRecipe}
        selectedRecipe={selectedRecipe}
        editMode = {editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm= {handleSubmitForm}
        deleteRecipe = {handleDeleteRecipe}
        />
    </Container>
    </>
  )
}

export default App
