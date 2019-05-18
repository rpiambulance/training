import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'cards'
    //   },
    //   {
    //     path: 'cards',
    //     component: CardsComponent,
    //     data: {
    //       title: 'Cards'
    //     }
    //   },
    //   {
    //     path: 'forms',
    //     component: FormsComponent,
    //     data: {
    //       title: 'Forms'
    //     }
    //   },
    //   {
    //     path: 'switches',
    //     component: SwitchesComponent,
    //     data: {
    //       title: 'Switches'
    //     }
    //   },
    //   {
    //     path: 'tables',
    //     component: TablesComponent,
    //     data: {
    //       title: 'Tables'
    //     }
    //   },
    //   {
    //     path: 'tabs',
    //     component: TabsComponent,
    //     data: {
    //       title: 'Tabs'
    //     }
    //   },
    //   {
    //     path: 'carousels',
    //     component: CarouselsComponent,
    //     data: {
    //       title: 'Carousels'
    //     }
    //   },
    //   {
    //     path: 'collapses',
    //     component: CollapsesComponent,
    //     data: {
    //       title: 'Collapses'
    //     }
    //   },
    //   {
    //     path: 'paginations',
    //     component: PaginationsComponent,
    //     data: {
    //       title: 'Pagination'
    //     }
    //   },
    //   {
    //     path: 'popovers',
    //     component: PopoversComponent,
    //     data: {
    //       title: 'Popover'
    //     }
    //   },
    //   {
    //     path: 'progress',
    //     component: ProgressComponent,
    //     data: {
    //       title: 'Progress'
    //     }
    //   },
    //   {
    //     path: 'tooltips',
    //     component: TooltipsComponent,
    //     data: {
    //       title: 'Tooltips'
    //     }
    //   }
    //  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
