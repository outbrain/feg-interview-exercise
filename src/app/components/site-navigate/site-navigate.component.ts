import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-navigate',
  standalone: true,
  imports: [IconComponent, RouterLink, RouterLinkActive],
  templateUrl: './site-navigate.component.html',
  styleUrl: './site-navigate.component.scss',
})
export class SiteNavigateComponent {}
