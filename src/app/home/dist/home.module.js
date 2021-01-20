"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeModule = void 0;
var testimonial_service_1 = require("./testimonial/testimonial.service");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var banner_component_1 = require("./banner/banner.component");
var blogs_component_1 = require("./blogs/blogs.component");
var features_component_1 = require("./features/features.component");
var services_component_1 = require("./services/services.component");
var subscribe_component_1 = require("./subscribe/subscribe.component");
var testimonial_component_1 = require("./testimonial/testimonial.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            declarations: [
                banner_component_1.BannerComponent,
                services_component_1.ServicesComponent,
                features_component_1.FeaturesComponent,
                subscribe_component_1.SubscribeComponent,
                blogs_component_1.BlogsComponent,
                testimonial_component_1.TestimonialComponent,
            ],
            imports: [common_1.CommonModule, forms_1.FormsModule],
            exports: [
                banner_component_1.BannerComponent,
                services_component_1.ServicesComponent,
                features_component_1.FeaturesComponent,
                subscribe_component_1.SubscribeComponent,
                blogs_component_1.BlogsComponent,
                testimonial_component_1.TestimonialComponent,
            ],
            providers: [testimonial_service_1.TestimonialService]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
