import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './pages/application/application.component';
import { CodeEditorComponent } from './pages/code-editor/code-editor.component';
import { CodeComponent } from './pages/code/code.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateBuilderComponent } from './pages/template-builder/template-builder/template-builder.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [
  { path: '', component: ApplicationComponent },
  { path: 'template', component: TemplateBuilderComponent },
  { path: 'coder', component: CodeComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'code-editor', component: CodeEditorComponent },
  { path: 'login', component: LoginComponent },



];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
