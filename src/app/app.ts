import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { FormsModule } from '@angular/forms';
import { Footer } from "./footer/footer";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FormsModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecom-project');
}
