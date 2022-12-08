import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { templateDetailPath } from 'src/app/shared/app.constants';
declare let grapesjs: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output("htmlContent") htmlContent: EventEmitter<string> = new EventEmitter<string>();
  @Output("cssContent") cssContent: EventEmitter<string> = new EventEmitter<string>();
  @Output("templateObjectChange") templateObjectChange: EventEmitter<any> = new EventEmitter<any>();
  _templateObject: any;
  @Input("templateObject")
  set templateObject(value) {
    if (!value || value == null || value == undefined) return;
    this._templateObject = value;
  }
  get templateObject(): any {
    return this._templateObject;
  }

  editor: any;
  editData: any;
  saveCommand: any = {
    run: (editor: any) => {
      this.editData = editor.getProjectData();
      this.editData.pages[0].id = this.templateObject.id;
      this.templateObjectChange.emit(Object.assign({}, this.editData));
      this.htmlContent.emit(editor.getHtml());
      this.cssContent.emit(editor.getCss());

    }
  };
  constructor(private renreder: Renderer2) { }
  ngOnDestroy(): void {
    this.editor?.destroy();
  }
  ngAfterViewInit(): void {
    // setTimeout(() => {
    this.initEditor();
    // });
  }

  ngOnInit(): void {
  }

  initEditor() {
    let lp = './img/';
    let plp = 'https://via.placeholder.com/350x250/';
    let images = [
      lp + 'team1.jpg', lp + 'team2.jpg', lp + 'team3.jpg', plp + '78c5d6/fff/image1.jpg', plp + '459ba8/fff/image2.jpg', plp + '79c267/fff/image3.jpg',
      plp + 'c5d647/fff/image4.jpg', plp + 'f28c33/fff/image5.jpg', plp + 'e868a2/fff/image6.jpg', plp + 'cc4360/fff/image7.jpg',
      lp + 'work-desk.jpg', lp + 'phone-app.png', lp + 'bg-gr-v.png'
    ];

    this.editor = grapesjs.init({
      height: '100%',
      container: '#gjs',
      fromElement: true,
      showOffsets: true,
      canvas: {
        styles: ['/assets/css/styles.compiled.css'],
      },
      assetManager: {
        embedAsBase64: true,
        assets: images
      },
      storageManager: {
        type: 'remote',
        stepsBeforeSave: 1,
        options: {
          remote: {
            urlLoad: templateDetailPath.replace('${ID}', this.templateObject.id),
            urlStore: templateDetailPath.replace('${ID}', this.templateObject.id),
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            fetchOptions: (opts: any) => (opts.method === 'POST' ? { method: 'PATCH' } : {}),
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: (data: any) => ({ id: this.templateObject.id, data: { html: this.editor.getHtml(), css: this.editor.getCss(), ...data } }),
            onLoad: (result: any) => result.data,
          }
        }
      },
      selectorManager: { componentFirst: true },
      styleManager: {
        sectors: [{
          name: 'General',
          properties: [
            {
              extend: 'float',
              type: 'radio',
              default: 'none',
              options: [
                { value: 'none', className: 'fa fa-times' },
                { value: 'left', className: 'fa fa-align-left' },
                { value: 'right', className: 'fa fa-align-right' }
              ],
            },
            'display',
            { extend: 'position', type: 'select' },
            'top',
            'right',
            'left',
            'bottom',
          ],
        }, {
          name: 'Dimension',
          open: false,
          properties: [
            'width',
            {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1,
            },
            'height',
            'max-width',
            'min-height',
            'margin',
            'padding'
          ],
        }, {
          name: 'Typography',
          open: false,
          properties: [
            'font-family',
            'font-size',
            'font-weight',
            'letter-spacing',
            'color',
            'line-height',
            {
              extend: 'text-align',
              options: [
                { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' }
              ],
            },
            {
              property: 'text-decoration',
              type: 'radio',
              default: 'none',
              options: [
                { id: 'none', label: 'None', className: 'fa fa-times' },
                { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' }
              ],
            },
            'text-shadow'
          ],
        }, {
          name: 'Decorations',
          open: false,
          properties: [
            'opacity',
            'border-radius',
            'border',
            'box-shadow',
            'background', // { id: 'background-bg', property: 'background', type: 'bg' }
          ],
        }, {
          name: 'Extra',
          open: false,
          buildProps: [
            'transition',
            'perspective',
            'transform'
          ],
        }, {
          name: 'Flex',
          open: false,
          properties: [{
            name: 'Flex Container',
            property: 'display',
            type: 'select',
            defaults: 'block',
            list: [
              { value: 'block', name: 'Disable' },
              { value: 'flex', name: 'Enable' }
            ],
          }, {
            name: 'Flex Parent',
            property: 'label-parent-flex',
            type: 'integer',
          }, {
            name: 'Direction',
            property: 'flex-direction',
            type: 'radio',
            defaults: 'row',
            list: [{
              value: 'row',
              name: 'Row',
              className: 'icons-flex icon-dir-row',
              title: 'Row',
            }, {
              value: 'row-reverse',
              name: 'Row reverse',
              className: 'icons-flex icon-dir-row-rev',
              title: 'Row reverse',
            }, {
              value: 'column',
              name: 'Column',
              title: 'Column',
              className: 'icons-flex icon-dir-col',
            }, {
              value: 'column-reverse',
              name: 'Column reverse',
              title: 'Column reverse',
              className: 'icons-flex icon-dir-col-rev',
            }],
          }, {
            name: 'Justify',
            property: 'justify-content',
            type: 'radio',
            defaults: 'flex-start',
            list: [{
              value: 'flex-start',
              className: 'icons-flex icon-just-start',
              title: 'Start',
            }, {
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-just-end',
            }, {
              value: 'space-between',
              title: 'Space between',
              className: 'icons-flex icon-just-sp-bet',
            }, {
              value: 'space-around',
              title: 'Space around',
              className: 'icons-flex icon-just-sp-ar',
            }, {
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-just-sp-cent',
            }],
          }, {
            name: 'Align',
            property: 'align-items',
            type: 'radio',
            defaults: 'center',
            list: [{
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            }, {
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            }, {
              value: 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            }, {
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          }, {
            name: 'Flex Children',
            property: 'label-parent-flex',
            type: 'integer',
          }, {
            name: 'Order',
            property: 'order',
            type: 'integer',
            defaults: 0,
            min: 0
          }, {
            name: 'Flex',
            property: 'flex',
            type: 'composite',
            properties: [{
              name: 'Grow',
              property: 'flex-grow',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Shrink',
              property: 'flex-shrink',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Basis',
              property: 'flex-basis',
              type: 'integer',
              units: ['px', '%', ''],
              unit: '',
              defaults: 'auto',
            }],
          }, {
            name: 'Align',
            property: 'align-self',
            type: 'radio',
            defaults: 'auto',
            list: [{
              value: 'auto',
              name: 'Auto',
            }, {
              value: 'flex-start',
              title: 'Start',
              className: 'icons-flex icon-al-start',
            }, {
              value: 'flex-end',
              title: 'End',
              className: 'icons-flex icon-al-end',
            }, {
              value: 'stretch',
              title: 'Stretch',
              className: 'icons-flex icon-al-str',
            }, {
              value: 'center',
              title: 'Center',
              className: 'icons-flex icon-al-center',
            }],
          }]
        }
        ],
      },
      plugins: [
        'gjs-blocks-basic',
        'grapesjs-component-countdown',
        'grapesjs-plugin-export',
        'grapesjs-tabs',
        'grapesjs-custom-code',
        'grapesjs-touch',
        'grapesjs-parser-postcss',
        'grapesjs-tooltip',
        'grapesjs-tui-image-editor',
        'grapesjs-style-bg',
        'grapesjs-preset-webpage',
      ],
      pluginsOpts: {
        'gjs-blocks-basic': { flexGrid: true },
        'grapesjs-tui-image-editor': {
          script: [
            // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
          ],
          style: [
            'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
            'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
          ],
        },
        'grapesjs-tabs': {
          tabsBlock: { category: 'Extra' }
        },
        'grapesjs-typed': {
          block: {
            category: 'Extra',
            content: {
              type: 'typed',
              'type-speed': 40,
              strings: [
                'Text row one',
                'Text row two',
                'Text row three',
              ],
            }
          }
        },
        'grapesjs-preset-webpage': {
          modalImportTitle: 'Import Template',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: function (editor: any) {
            return editor.getHtml() + '<style>' + editor.getCss() + '</style>'
          },
        },
      },
      layerManager: {
        // If the `root` is not specified or the component element is not found,
        // the main wrapper component will be used.
        root: '#my-custom-root',
        sortable: false,
        hidable: false,
      }
    });
    this.editor.Panels.addPanel({
      id: 'panel-top',
      el: '.panel__top',
    });
    this.editor.Panels.addPanel({
      id: 'basic-actions',
      el: '.panel__basic-actions',
      buttons: [
        {
          id: 'save',
          active: true, // active by default
          className: 'btn-toggle-borders ux-icon ux-icon-save',
          label: '',
          title:'Save',
          command: this.saveCommand, // Built-in command
        },
      ],
    });


    this.editor.BlockManager.add('table', {
      // ...
      label: '<b>Table</b>',
      content: ` <table class="table table-hover">
      <thead id="ixyfy">
        <tr>
          <th>#
          </th>
          <th>Data
          </th>
        </tr>
      </thead>
      <tbody id="icyfk">
        <tr>
          <td>1
          </td>
          <td>Felicity
          </td>
        </tr>
      </tbody>
    </table>`
    });


    this.editor.onReady(() => {
      // perform actions
      // if (this._templateObject != null || this._templateObject != undefined) {
      //   this.editor.loadProjectData(this._templateObject);
      //   this.editor.refresh();
      // }
    });
  }
}
