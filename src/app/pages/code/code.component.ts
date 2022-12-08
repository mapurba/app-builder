import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TemplatesService } from '../template-builder/service/templates.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  templateList: any[] = [];
  workspaceList: any[] = [];
  ngOnInit(): void {
    // this.loadCodeEditor();
    this.refresh();
  }
  @ViewChild('code', { static: true }) code: ElementRef | undefined;

  constructor(private renderer: Renderer2, private templatesService: TemplatesService,) { }
  loadCodeEditor() {
    this.renderer.removeAttribute(this.code?.nativeElement, "src");
    setTimeout(() => {
      this.renderer.setAttribute(this.code?.nativeElement, "src", "")
    })
  }

  refresh() {
    this.templatesService.templateListSubject().subscribe((data: any) => {
      this.templateList = data;
    })
    this.listWorkspace();
  }

  listWorkspace(){
    this.templatesService.getAllWorkspace().subscribe((data: any) => {
      this.workspaceList = data;
    })
  }
  createNewApp(){
    this.templatesService.createWorkspace().subscribe((res) => {
      this.refresh()
    });
  }


}
