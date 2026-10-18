import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './services/portfolio.service';
import { IconComponent } from './components/icon/icon.component';
import { CosmicBackgroundComponent } from './components/cosmic-background/cosmic-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconComponent, CosmicBackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly ps = inject(PortfolioService);
  readonly currentYear = new Date().getFullYear();
}
