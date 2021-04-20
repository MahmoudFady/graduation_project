import { StatisticService } from './statistic.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-admin-statistics',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})
export class StatisticComponent {
  counts: {
    postCount: number;
    userCount: number;
    commentCount: number;
    reportCount: number;
  } = {
    postCount: 0,
    userCount: 0,
    commentCount: 0,
    reportCount: 0,
  };
  constructor(private statisticService: StatisticService) {}
  ngOnInit(): void {
    this.statisticService.getNumbers().subscribe((resualt) => {
      this.counts = resualt;
      console.log(resualt);
    });
  }
}
