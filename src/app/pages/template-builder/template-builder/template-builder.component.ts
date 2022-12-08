import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { S4, sampleTemplate } from 'src/app/shared/app.constants';
import { TemplatesService } from '../service/templates.service';
declare let grapesjs: any;

@Component({
  selector: 'app-template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements AfterViewInit, OnInit {


  expand: boolean = true;
  selectedtemplate: any;
  editor: any;
  activeRowId: any;
  templateList: any[] = [];
  cssContent: any;
  loading: boolean = true;
  toggleActiveRow(rowData: any): void {
    if (this.activeRowId === rowData.id) {
      this.activeRowId = null;
    } else {
      this.activeRowId = rowData.id;
    }
  }

  _templateList: Map<string, any> = new Map<string, any>();

  constructor(private templatesService: TemplatesService, private renreder: Renderer2) {

  }

  refresh() {
    this.templatesService.templateListSubject().subscribe((data: any) => {
      this.templateList = data;

    })
  }
  ngOnInit(): void {
    // this.templateList = Array.from(this._templateList.values());

    this.refresh();
  }





  ngAfterViewInit(): void {

  }

  addNew() {
    this.templatesService.createNewTemplate().subscribe();
  }



  openTemplateForEdit(template: any) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.selectedtemplate = template;
    }, 500);
  }


  cssContentEvent(event: any) {
    this.cssContent = event;
  }
  templateChangeEvent(event: any) {
    let id = event.pages[0].id;
    // this._templateList.set(event.pages[0].id, { id, title: 'Browse catalog status', ...event });
  }

}