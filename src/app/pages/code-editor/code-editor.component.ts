import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TemplatesService } from '../template-builder/service/templates.service';
import { ChangeDetectionStrategy, } from '@angular/core'
import { IOutputData, SplitComponent } from 'angular-split'

@Component({
  selector: 'app-code-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  templateList: any[] = [];
  ngOnInit(): void {
    this.loadCodeEditor();
    this.refresh();
  }
  @ViewChild('code', { static: true }) code: ElementRef | undefined;

  constructor(private renderer: Renderer2, private templatesService: TemplatesService,) { }
  loadCodeEditor() {
    this.renderer.removeAttribute(this.code?.nativeElement, "src");
    setTimeout(() => {
      this.renderer.setAttribute(this.code?.nativeElement, "src", "http://localhost/app/code?workspaceId=6390dc5a-33b8201cdd5b087490cde71b")
    })
  }

  refresh() {
    this.templatesService.templateListSubject().subscribe((data: any) => {
      this.templateList = data;

    })
  }


  showIframeHider = false
  @ViewChild('split', { static: true }) split: SplitComponent | undefined;

  dragStartHandler($event: IOutputData) {
    console.log('dragStartHandler', { event: $event })
    this.showIframeHider = true
  }

  dragEndHandler($event: IOutputData) {
    console.log('dragEndHandler', { event: $event })
    this.showIframeHider = false
  }

  splitGutterClick({ gutterNum }: IOutputData) {
    // By default, clicking the gutter without changing position does not trigger the 'dragEnd' event
    // This can be fixed by manually notifying the component
    // See issue: https://github.com/angular-split/angular-split/issues/186
    // TODO: Create custom example for this, and document it
  }


}
