import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { S4, sampleTemplate, templateDetailPath, templateListPath } from 'src/app/shared/app.constants';
import { PathConstant } from 'src/app/shared/constants/path.constant';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  _templateListSubject: any = new Subject<Map<string, any>>();
  _templateList: Map<string, any> = new Map<string, any>();


  constructor(private http: HttpClient) {
    this._templateList.set("22352", {
      id: '22352',
      title: 'Browse catalog status',
      label: 'Sanity, Regression',
      labelColor: 'orange',
      htmlContent: '',
      cssContent: ''
    })
    this._templateList.set("22353", {
      id: '22353',
      title: 'landing component',
      label: 'Sanity, Regression',
      labelColor: 'orange',
      htmlContent: '',
      cssContent: ''
    });
  }

  templateListSubject(): Observable<any> {
    return this.http.get(templateListPath);
  }
  savetemplateDetailSubject(id: any, val: any): Observable<any> {
    return this.http.patch(templateDetailPath.replace('${ID}', id), val);
  }

  createNewTemplate() {
    return this.http.post(templateListPath, sampleTemplate)
  }

  getAllWorkspace() {
    return this.http.get(PathConstant.workspaceList);
  }
  createWorkspace() {
    return this.http.post(PathConstant.workspaceList, {
      "ec2_instance_type": "",
      "cpu_cores": 4,
      "disk_gb": 10,
      "gpus": 0,
      "memory_gb": 4,
      "image_id": "636ca42f-1e1173835c341cfae25c23c2",
      "org_id": "default",
      "image_tag": "latest",
      "use_container_vm": false,
      "resource_pool_id": "docker",
      "autostart_enabled": true,
      "workspace_auto_off_threshold": 0,
      "name": `app-${S4()}`
    });
  }
}
