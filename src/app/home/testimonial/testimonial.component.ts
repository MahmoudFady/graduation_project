import { AuthService } from './../../auth/auth.service';
import { Testimonial, TestimonialService } from './testimonial.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  isAdmin = false;
  @Input() testimonials: Testimonial[] = [];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin() ? true : false;
  }
}
