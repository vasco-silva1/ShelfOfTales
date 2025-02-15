import { Component } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  loading$ = this.loaderService.loading$;

  constructor(private loaderService: LoaderService) {}
  }
