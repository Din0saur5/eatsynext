
import React, { useState } from "react";
import { Metadata } from "next";
import CardGrid from "@/components/CardGrid";
import { getUserIdFromToken } from "../../fetches";


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

  const user_id = await getUserIdFromToken()
 
  
  return ( 
  <>
  
  <div className="ml-2/5 mb-10">Showing results for {params.query.replace(/%20/g, ' ')}:</div>
  <CardGrid
    user_id={user_id}
     param={{name: 'searchTerm', value: params.query.replace(/%20/g, ' ')}} 
      />
  </>
  )
};

export default Results;
