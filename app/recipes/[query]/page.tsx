
import React, { useState } from "react";
import { Metadata } from "next";
import { searchRecipes } from "../../fetches";
import CardGrid from "@/components/CardGrid";
import { getRecipeImageUrl } from "../../fetches";


type Props = {
    params: {
      query: string;
    };
  };
  
 
  //Generate page metadata
  export const generateMetadata = async ({
    params,
  }: Props): Promise<Metadata> => {
    return {
      title: `Search for ${params.query.replace(/%20/g, ' ')}`,
      description: `Recipes found by searching ${params.query.replace(/%20/g, ' ')}`,
    };
  };
const Results = async ({ params }: { params: { query: string } }) => {


 
  
  return ( 
  <>
  
  <div>Results for {params.query.replace(/%20/g, ' ')}:</div>
  <CardGrid getRecipeImageUrl={getRecipeImageUrl} 
     param={{name: 'searchTerm', value: params.query.replace(/%20/g, ' ')}}
      />
  </>
  )
};

export default Results;
