import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import Setor from "../pages/sector";

function Routes(){
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" exact />
           <Route component = { Setor }  path="/setor" />
       </BrowserRouter>
   )
}

export default Routes;