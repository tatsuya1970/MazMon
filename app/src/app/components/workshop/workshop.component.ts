import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-workshop',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatGridListModule],
  templateUrl: './workshop.component.html',
  styleUrl: './workshop.component.scss',
})
export class WorkshopComponent {
  ids = Array.from(Array(24).keys()).map((i) => i + 1);

  icon(id: number) {
    return `https://temp-tatsuya.s3.ap-northeast-1.amazonaws.com/web3hack-parts-image/icon_${id}.png`;
  }
}
