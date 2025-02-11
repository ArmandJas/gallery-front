import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DummyService } from './core/services/dummy.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gallery-front';
  time = 'Loading'

  constructor(private dummyService: DummyService) {
  }

  ngOnInit(): void {
    this.getTime();
  }

  getTime(): void {
    this.dummyService.getTime().subscribe(time => this.time = time);
  }
}
