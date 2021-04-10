import { Testimonial, TestimonialService } from './testimonial.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  @Input() testimonials: Testimonial[] = [];
  ngOnInit(): void {
  }
}
