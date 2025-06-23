import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-problem-section',
  imports: [
    CommonModule,
    RouterLink,

],
  templateUrl: './problem-section.component.html',
  styleUrl: './problem-section.component.css'
})
export class ProblemSectionComponent {


}
