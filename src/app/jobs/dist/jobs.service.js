"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var JobService = /** @class */ (function () {
    function JobService(postService) {
        this.postService = postService;
        this.updatedJobs = new rxjs_1.Subject();
        this.jobLinks = [];
        this.updateJobLinks = new rxjs_1.Subject();
    }
    JobService.prototype.getJobLinks = function (jobs) {
        var _this = this;
        this.jobLinks = [];
        console.log(jobs);
        jobs.forEach(function (job) {
            if (!_this.jobLinks.includes(job.job)) {
                _this.jobLinks.push(job.job);
            }
        });
        console.log(this.jobLinks);
        this.updateJobLinks.next(this.jobLinks);
    };
    JobService.prototype.addJob = function (job) {
        this.jobs.push(job);
        this.getJobLinks(this.jobs);
        this.updatedJobs.next(this.jobs);
    };
    JobService.prototype.deleteJob = function (jobId) {
        var jobIndex = this.jobs.findIndex(function (job) { return job._id === jobId; });
        this.jobs.splice(jobIndex, 1);
        this.getJobLinks(this.jobs);
        this.updatedJobs.next(this.jobs);
    };
    JobService.prototype.getAllJobs = function () {
        var _this = this;
        this.postService.getAllPosts();
        this.postService.getUpdatedPosts().subscribe(function (posts) {
            _this.jobs = posts;
            _this.getJobLinks(_this.jobs);
            _this.updatedJobs.next(_this.jobs);
        });
    };
    JobService.prototype.getUpdatedJobs = function () {
        return this.updatedJobs.asObservable();
    };
    JobService.prototype.getUpdatedJobLinks = function () {
        return this.updateJobLinks.asObservable();
    };
    JobService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
