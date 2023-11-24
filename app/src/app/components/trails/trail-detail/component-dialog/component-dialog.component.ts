import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-component-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './component-dialog.component.html',
  styleUrl: './component-dialog.component.scss',
})
export class ComponentDialogComponent {
  icon = `https://temp-tatsuya.s3.ap-northeast-1.amazonaws.com/web3hack-parts-image/icon_${Math.floor(
    Math.random() * 24 + 1
  )}.png`;
}
