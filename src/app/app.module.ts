import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {GrowlModule, ConfirmDialogModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {
    PaginationDirective,
    DateRangeDirective,
    eChartComponent,
    KtEditorDirective,
    UploadCoverComponent,
    musicPlayComponent
} from './directive';



import {
    MainComponent,
    LogComponent,
    ModifyPasswordComponent


}from './main';
import {routing} from './app.routing';
import {HttpInterceptor, HttpInterceptorBackend, HttpFactory} from './http';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import '../styles/styles.scss';
import '../styles/headings.css';
import '../lib/bootstrap/dist/css/bootstrap.min.css';
import '../lib/iconfont/iconfont.css';
import '../lib/primeng/resources/themes/omega/theme.css';
import '../lib/primeng/resources/primeng.min.css';
import '../lib/font-awesome-4.7.0/css/font-awesome.min.css';
import '../lib/daterangepicker/daterangepicker.min.js';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        GrowlModule,
        ConfirmDialogModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        LogComponent,
        ModifyPasswordComponent,
        PaginationDirective,
        DateRangeDirective,
        eChartComponent,
        KtEditorDirective,
        UploadCoverComponent,
        musicPlayComponent


    ],
    providers: [
        HttpInterceptorBackend, HttpInterceptor,
        {provide: Http, useFactory: HttpFactory, deps: [HttpInterceptorBackend, RequestOptions]},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef:ApplicationRef) {

    }

    hmrOnInit(store) {
        console.log('HMR store', store);
    }

    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
