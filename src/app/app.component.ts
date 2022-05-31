import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HTTPTunnel, WebSocketTunnel } from '@raytecvision/guacamole-common-js';

import {
  RemoteDesktopService,
  TunnelRestApiService,
} from '@raytecvision/ngx-remote-desktop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./themes/default.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public fileManagerVisible: boolean = false;

  constructor(
    public dialog: MatDialog,
    public remoteDesktopService: RemoteDesktopService,
    public tunnelRestApiService: TunnelRestApiService
  ) {}

  handleDisconnect(): void {
    this.remoteDesktopService.getClient().disconnect();
  }

  handleEnterFullScreen() {
    this.remoteDesktopService.setFullScreen(true);
  }

  handleExitFullScreen() {
    this.remoteDesktopService.setFullScreen(false);
  }

  toggleFileManager() {
    this.fileManagerVisible = !this.fileManagerVisible;
  }

  ngOnInit() {
    const wsUrl = `ws://${location.host}/websocket-tunnel`;
    const httpUrl = `http://${location.host}/tunnel`;
    const wsTunnel = new WebSocketTunnel(wsUrl);
    const httpTunnel = new HTTPTunnel(httpUrl, true, null);
    this.remoteDesktopService.initialize(wsTunnel);

    this.connect();

    this.remoteDesktopService.onReconnect.subscribe((reconnect) =>
      this.connect()
    );
  }

  connect() {
    // You'll want to inject the token and other parameters from your own app
    const parameters = {
      scheme: 'protocol',
      hostname: 'hostname',
      port: '3389',
      'ignore-cert': true,
      username: 'username',
      password: 'password',
    };

    this.remoteDesktopService.connect(parameters);
  }
}
