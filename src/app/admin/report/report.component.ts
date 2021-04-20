import { Report } from './report.model';
import { ReportService } from './report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  reportDeleted: boolean = false;
  constructor(private reportService: ReportService) {}
  ngOnInit(): void {
    this.reportService.getAllReports();
    this.reports = this.reportService.getReports();
    this.reportService.getUpdatedReports().subscribe((reports) => {
      this.reports = reports;
    });
  }
  deleteRport(id: string) {
    this.reportDeleted = true;
    this.reportService.deleteReport(id);
    setTimeout(() => {
      this.reportDeleted = false;
    }, 1000);
  }
}
