import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Trail } from 'src/app/models/trail';

@Component({
  selector: 'app-trails',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './trails.component.html',
  styleUrl: './trails.component.scss',
})
export class TrailsComponent {
  trails: Trail[] = [
    {
      id: 1,
      name: '横川町 → 南蟹屋',
      distance: 4.4,
      image:
        'https://www.nepalhikingteam.com/wp-content/uploads/2018/01/everest-base-camp-trek-1.jpg',
      url: 'https://www.nepalhikingteam.com/everest-base-camp-trek/',
      quality: 5,
      date: '2023-11-13',
    },
    {
      id: 2,
      name: '瀬野南 → 古屋',
      distance: 28.1,
      image:
        'https://www.nepalhikingteam.com/wp-content/uploads/2018/01/everest-base-camp-trek-1.jpg',
      url: 'https://www.nepalhikingteam.com/everest-base-camp-trek/',
      quality: 5,
      date: '2023-10-28',
    },
  ];
}
