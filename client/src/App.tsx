import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get<Recipe[]>('https://localhost:5001/api/recipes')
      .then(response => setRecipes(response.data))
  },[])
  
  return (
    <>
    <Typography variant='h3'>Flavorfiesta</Typography>
      <List>
        {recipes.map((recipes) => (
          <ListItem key={recipes.id}>
            <ListItemText>{recipes.title}</ListItemText>
            </ListItem>
        ) )}
      </List>
    </>
  )
}

export default App
