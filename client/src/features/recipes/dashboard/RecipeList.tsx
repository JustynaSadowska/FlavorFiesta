import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import RecipeCard from "./RecipeCard";
import { InfiniteData } from "@tanstack/react-query";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
type Props = {
  recipesGroup?: InfiniteData<PagedList<Recipe, string>>;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
};

const RecipeList = observer(function RecipeList({ recipesGroup, isLoading, fetchNextPage, hasNextPage }: Props) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  } 
  if (!recipesGroup) return <Typography>No recipes found</Typography>;
  return (
    // <Box sx={{display: "flex",
    //     flexWrap: "wrap",           
    //     gap: 3,
    //     justifyContent: "center",
    //     }}>
    //       {recipesGroup.pages.map((recipes,index) => (
    //         <Box 
    //           key={index}
    //           ref={index === recipesGroup.pages.length -1 ? ref : null}
    //           display= 'flex'
    //           gap={3}
    //           >
    //           {recipes.items.map((recipe) => (
    //             <RecipeCard key={recipe.id} recipe={recipe} />
    //             ))}
    //         </Box>
    //       ))}
    // </Box>
     <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center"}}>
      <Grid2 
        container 
        spacing={{ xs: 1, md: 3 }} 
        columns={{ xs: 4, sm: 8, md: 12 }} 
      >
        {recipesGroup.pages.map((recipesPage, pageIndex) => 
          recipesPage.items.map((recipe, itemIndex) => {
            const isLastItem = pageIndex === recipesGroup.pages.length - 1 
                               && itemIndex === recipesPage.items.length - 1;

            return (
              <Grid2 
                key={recipe.id} 
                sx= {{xs:2, sm:4, md:4}}
                ref={isLastItem ? ref : null}
              >
                <RecipeCard recipe={recipe} />
              </Grid2>
            );
          })
        )}
      </Grid2>
    </Box>
  );

    
  
});

export default RecipeList;
