import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loading = false;
  driving = false;
  duration = new Date(0);

  private startAt = new Date();
  private timer?: Subscription;
  private waitTime = 1000;

  constructor(private storage: StorageMap, private snack: MatSnackBar) {
    storage
      .get<boolean>('driving', { type: 'boolean' })
      .subscribe((driving) => {
        this.driving = !!driving;
      });
  }

  startDriving() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.storage.set('driving', (this.driving = true));
      this.startAt = new Date();
      this.timer = interval(1000).subscribe(() => {
        this.duration = new Date(+new Date() - +this.startAt);
      });
    }, this.waitTime);
  }

  stopDriving() {
    this.loading = true;
    this.timer?.unsubscribe();
    setTimeout(() => {
      this.loading = false;
      this.storage.set('driving', (this.driving = false));
      this.snack.open('Your trail is saved.', 'OK', {
        duration: 5000,
      });
    }, this.waitTime);
  }
}
