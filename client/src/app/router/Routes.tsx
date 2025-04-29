import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'recipes', element: <RecipeDashboard/>},
            {path: 'createRecipe', element: <RecipeForm key='create'/>},
            {path: 'recipes/:id', element: <RecipeDetails/>},
            {path: 'manage/:id', element: <RecipeForm/>},

        ]
    }
])