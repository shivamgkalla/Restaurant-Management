import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-api-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './api-loader.component.html',
  styleUrl: './api-loader.component.css',
})
export class ApiLoaderComponent {
  @Input() show = false;
  @Input() fullscreen = false;
  @Input() message = 'Loading...';
}
