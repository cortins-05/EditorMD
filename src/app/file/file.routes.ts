import { Routes } from "@angular/router";
import { NewFilePage } from "./pages/new-file-page/new-file-page";
import { OpenFilePage } from "./pages/open-file-page/open-file-page";
import { CloseFilePage } from "./pages/close-file-page/close-file-page";

export const fileRoutes:Routes = [
  {
    path:'',
    children:[
      {
        path:'new',
        component:NewFilePage
      },
      {
        path:'open',
        component:OpenFilePage
      },
      {
        path:'close',
        component:CloseFilePage
      },
      {
        path:'**',
        redirectTo:'new'
      }
    ]
  }
]

export default fileRoutes;
