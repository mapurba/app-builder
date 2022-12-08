import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IconComponent, IconModule, MenuModule, NavigationModule, PageHeaderModule, SidePanelModule, TabComponent, TabsetComponent } from '@ux-aspects/ux-aspects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './pages/application/application.component';
import { TemplatesService } from './pages/template-builder/service/templates.service';
import { TemplateBuilderComponent } from './pages/template-builder/template-builder/template-builder.component';
import { WidgetsModule } from './pages/components/widgets/widgets.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CodeComponent } from './pages/code/code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PathConstant } from './shared/constants/path.constant';
import { InterceptorService } from './shared/interceptor/interceptor.service';
import { AppContextService } from './shared/services/context/app-context.service';
// import { HighlightService } from './shared/services/highlight/highlight.service';
import { CookiesService } from './shared/utils/cookies.service';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { CodeEditorComponent } from './pages/code-editor/code-editor.component';
import { createCustomElement } from '@angular/elements';
import { AngularSplitModule } from "angular-split";

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    TemplateBuilderComponent,
    CodeComponent,
    WorkspaceComponent,
    CodeEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NavigationModule,
    IconModule,
    WidgetsModule,
    HttpClientModule,
    AngularSplitModule,
    BrowserAnimationsModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useClass: CustomLoader,
    //     deps: [HttpClient, LocalizationService]
    //   }
    // }),
    // ModalModule.forRoot(),
    MenuModule,
    SidePanelModule,
    // ProfileModule
  ],
  providers: [TemplatesService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadContextAndLocal,
    //   deps: [AppContextService, PathConstant,],
    //   multi: true
    // },
    // HighlightService,
    PathConstant,
    AppContextService,
    CookiesService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function loadContextAndLocal(appContext: AppContextService, injector: Injector ) {
  customElements.define('ux-icon', createCustomElement(IconComponent, {injector}));
  customElements.define('ux-tabset', createCustomElement(TabsetComponent, {injector}));
  customElements.define('ux-tab', createCustomElement(TabComponent, {injector}));


  return () => appContext.load();

}


