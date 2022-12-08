import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  searchFormControl = new FormControl('');

  onClearSearchClicked(): void {
    this.searchFormControl.setValue('');
  }

  public favorite(tile: any) {
    tile.favorited = !tile.favorited;
  }

  showAllApps = false;
  showAllTasks = false;

  smTiles = [
    {
      smTileName: 'Docs',
      smTileIcon: '',
      smTileImage:
        '/iam-ux/iam-ux-aspects/assets/images/google_G_128.png',
      smTileStatus: '',
      favorited: false,
    },
    {
      smTileName: 'Sheets',
      smTileIcon: '',
      smTileImage:
        '/iam-ux/iam-ux-aspects/assets/images/google_G_128.png',
      smTileStatus: '',
      favorited: false,
    },
    {
      smTileName: 'Timecard',
      smTileIcon: '',
      smTileImage:
        '/iam-ux/iam-ux-aspects/assets/images/workday-logo-200.png',
      smTileStatus: '',
      favorited: true,
    },
    {
      smTileName: 'Personal Goals',
      smTileIcon: '',
      smTileImage:
        '/iam-ux/iam-ux-aspects/assets/images/workday-logo-200.png',
      smTileStatus: '',
      favorited: false,
    },
    {
      smTileName: 'Password Sync',
      smTileIcon: 'ias-icon ias-icon-password_sync',
      smTileImage: '',
      smTileStatus: '',
      favorited: false,
    },
    {
      smTileName: 'Help Desk',
      smTileIcon: 'ias-icon ias-icon-support_thick',
      smTileImage: '',
      smTileStatus: '',
      favorited: false,
    },
  ];

  lgTiles = [
    {
      lgTileName: 'Databox',
      lgTileIcon: '/iam-ux/iam-ux-aspects/assets/images/databox_200.png',
      lgTileStatus: '',
      lgTileInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      lgTileName: 'Suse Linux',
      lgTileIcon: '/iam-ux/iam-ux-aspects/assets/images/geeko_icon.png',
      lgTileStatus: '',
      lgTileInfo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    // {
    //     lgTileName: 'GitHub',
    //     lgTileIcon:
    //         '/iam-ux/iam-ux-aspects/assets/images/github-logo-200.png',
    //     lgTileStatus:
    //         'iam-tile-status suspend ias-icon ias-icon-color-red ias-icon-cancel_thick',
    //     lgTileInfo:
    //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    // },
  ];
}
