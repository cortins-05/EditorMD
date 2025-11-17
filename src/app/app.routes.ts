import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';

export const routes: Routes = [
  {
    path:'home',
    component:HomePage
  },
  {
    path:'file',
    loadChildren: ()=>import("./file/file.routes").then(m=>m.fileRoutes),
    title:'File'
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
