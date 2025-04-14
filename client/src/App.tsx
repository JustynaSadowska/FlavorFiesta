import { Box, Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    axios.get<Recipe[]>('https://localhost:5001/api/recipes')
      .then(response => setRecipes(response.data))
  },[])
  
  return (
    <Card >
      <Box padding={2}>
        <Typography variant='h3'>Flavorfiesta</Typography>
          <List>
            {recipes.map((recipes) => (
              <ListItem key={recipes.id}>
                <ListItemText>{recipes.title}</ListItemText>
                <ListItemText>{recipes.description}</ListItemText>
                <ListItemText>{recipes.difficulty}</ListItemText>
                <ListItemText>{recipes.preparationTime}</ListItemText>
                <ListItemText>{recipes.servings}</ListItemText>
                <ListItemText>{recipes.createdAt}</ListItemText>
                </ListItem>
            ) )}
          </List>
      </Box>
    </Card>
  )
}

export default App
