"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobLinks = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var JobLinks = /** @class */ (function () {
    function JobLinks(postService) {
        this.postService = postService;
        this.postedJobs = [];
    }
    JobLinks.prototype.getPosts = function (job, ele) {
        document.querySelectorAll('ul li').forEach(function (li) {
            li.classList.remove('active');
        });
        ele.classList.add('active');
        this.postService.getPostByJob(job);
    };
    __decorate([
        core_1.Input()
    ], JobLinks.prototype, "postedJobs");
    JobLinks = __decorate([
        core_2.Component({
            selector: 'job-links',
            templateUrl: './job-links.component.html',
            styleUrls: ['./job-links.component.css']
        })
    ], JobLinks);
    return JobLinks;
}());
exports.JobLinks = JobLinks;
