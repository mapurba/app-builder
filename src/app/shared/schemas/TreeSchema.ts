/*
* ========================================================================
* (c) Copyright 2022 Micro Focus or one of its affiliates.
* ========================================================================
*/
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PathConstant } from '../constants/path.constant';

/** Flat node with expandable and level information */
export class DNFlatNode {
    constructor(
        public item: string,
        public level = 1,
        public expandable = false,
        public isLoading = false,
        public focused = false,
    ) { }
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({ providedIn: 'root' })
export class DnLookupDataBase {
    dataMap = new Map<string, string[]>([
        ['Tree', []],
    ]);

    constructor(private http: HttpClient) { }

    rootLevelNodes: string[] = ['Tree'];
    _filter: string = '';
    _connectionId = '';
    _path = '';

    set path(path) {
        this._path = path;
    }
    set connectionId(connectionId) {
        this._connectionId = connectionId;
    }
    set filter(filter) {
        this._filter = filter;
    }

    /** Initial data from database */
    initialData(): DNFlatNode[] {
        return this.rootLevelNodes.map(name => new DNFlatNode(name, 0, true));
    }

    async getChildren(node: string): Promise<string[]> {
        return await this.getData(node, node);
    }

    isExpandable(node: string): boolean {
        return true;
    }

    getData(dn: any = '', node) {
        let url;
        dn = dn == 'Tree' ? '' : dn;
        url = this.getQueryUrl(this._path, this._connectionId, encodeURIComponent(dn), encodeURIComponent(this._filter));
        // this.loadingHierarchynode = true;
        const promise = new Promise<any>((resolve, reject) => {
            this.http.get(url).subscribe({
                next: (res: any) => {
                    if (res.status == "success") {
                        let child = JSON.parse(res.data).map((item) => {
                            // return { name: item, id: btoa(item), path: dn != '' ? `${item},${dn}` : `${item}`, hasChildren: true }
                            return dn != '' ? `${item},${dn}` : `${item}`

                        })
                        resolve(child)
                    }
                    else {
                        node.parent.data.hasChildren = false;
                        resolve([])
                    };
                },
                error: (err: any) => {
                    reject(err);
                },
                complete: () => {
                    // this.showHierarchy(dn, node);
                },
            });
        });
        return promise;
    }


    getQueryUrl(filePath, connectionId, dn, filter) {
        let url = PathConstant.dnQueryPath.replace("{filePath}", filePath).replace("{connectionId}", connectionId).replace("{dn}", dn).replace("{filter}", filter)
        return url;
    }
}


/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
export class DnLookupSource implements DataSource<DNFlatNode> {
    dataChange = new BehaviorSubject<DNFlatNode[]>([]);

    get data(): DNFlatNode[] {
        return this.dataChange.value;
    }
    set data(value: DNFlatNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(
        private _treeControl: FlatTreeControl<DNFlatNode>,
        private _database: DnLookupDataBase,
    ) { }

    connect(collectionViewer: CollectionViewer): Observable<DNFlatNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<DNFlatNode>).added ||
                (change as SelectionChange<DNFlatNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<DNFlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    disconnect(collectionViewer: CollectionViewer): void { }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<DNFlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed
                .slice()
                .reverse()
                .forEach(node => this.toggleNode(node, false));
        }
    }

    /**
     * Toggle the node, remove from display list
     */
    async toggleNode(node: DNFlatNode, expand: boolean) {
        node.isLoading = true;
        const children: any = await this._database.getChildren(node.item);
        const index = this.data.indexOf(node);
        if (!children || index < 0) {
            // If no children, or cannot find the node, no op
            return;
        }



        setTimeout(() => {
            if (expand) {
                const nodes = children.map(
                    name => new DNFlatNode(name, node.level + 1, this._database.isExpandable(name)),
                );
                this.data.splice(index + 1, 0, ...nodes);
            } else {
                let count = 0;
                for (
                    let i = index + 1;
                    i < this.data.length && this.data[i].level > node.level;
                    i++, count++
                ) { }
                this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
        }, 1000);
    }
}
