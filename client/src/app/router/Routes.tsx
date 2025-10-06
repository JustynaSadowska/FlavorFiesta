import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import RecipeDashboard from "../../features/recipes/dashboard/RecipeDashboard";
import RecipeForm from "../../features/recipes/form/RecipeForm";
import RecipeDetails from "../../features/recipes/details/RecipeDetailsPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../features/account/RegisterForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import UserDashboard from "../../features/profiles/UserDashboard";
import SettingsPage from "../../features/profiles/settings/SettingsPage";
import VerifyEmail from "../../features/account/VerifyEmail";
import ChangePasswordForm from "../../features/account/ChangePasswordForm";
import ForgotPasswordForm from "../../features/account/ForgotPasswordForm";
import ResetPasswordForm from "../../features/account/ResetPasswordForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'createRecipe', element: <RecipeForm key='create'/>},
                {path: 'manage/:id', element: <RecipeForm/>},
                {path: 'profiles/:id/settings', element: <SettingsPage/>},
                {path: 'change-password', element: <ChangePasswordForm/>},    
               
            ]},
            {path: 'recipes', element: <RecipeDashboard/>},
            {path: 'recipes/:id', element: <RecipeDetails/>},
            {path: 'profiles/:id', element: <ProfilePage/>},
            {path: 'profiles', element: <UserDashboard/>},
            {path: '', element: <HomePage/>},
            {path: 'counter', element: <Counter/>},
            {path: 'errors', element: <TestErrors/>},
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: 'login', element: <LoginForm/>},
            {path: 'register', element: <RegisterForm/>},
            {path: 'confirm-email', element: <VerifyEmail/>},
            {path: 'forgot-password', element: <ForgotPasswordForm/>},
            {path: 'reset-password', element: <ResetPasswordForm/>},
            {path: '*', element: <Navigate replace to = '/not-found'/>},
        ]
    }
])