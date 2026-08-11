import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from "./layout/footer/footer";
import { RouterOutlet } from "@angular/router";

type Img = {
  src: string;
  alt: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule, Navbar, Footer, RouterOutlet],
})
export class App {

}
