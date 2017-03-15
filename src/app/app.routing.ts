import {RouterModule, Routes} from '@angular/router';





import { LoginComponent } from './login/login.component';


import { MainComponent,
    LogComponent,
    ModifyPasswordComponent,
} from './main';





// 定义常量 嵌套自路由
const appChildRoutes:Routes = <Routes>[
    {path: 'log', component: LogComponent, data: {pageNo: 1, pageSize: 10}},
    {path: 'modify-password', component: ModifyPasswordComponent}

    ];

const routes:Routes = <Routes>[
    {path: '', component: LoginComponent},
    {path: 'main', component: MainComponent, children: appChildRoutes}
];

export const routing = RouterModule.forRoot(routes);
