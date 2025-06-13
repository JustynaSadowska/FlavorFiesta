import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetails";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

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
            {path: 'counter', element: <Counter/>},
            {path: 'errors', element: <TestErrors/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <Navigate replace to = 'not-found'/>},


        ]
    }
])