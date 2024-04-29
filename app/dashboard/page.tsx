import React from "react";
import { Metadata } from "next";
import DashLayout from "./DashLayout";
import { getUserIdFromToken } from "../fetches";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "See your favorites and upload your own recipes.",
};

const Dashboard = async () => {
  const user_idRaw = await getUserIdFromToken()
  const user_id = user_idRaw.toString() 
  return (
  <>
  <div>Dashboard</div>
  <DashLayout user_id = {user_id}
  />
  </>
  )
};

export default Dashboard;
