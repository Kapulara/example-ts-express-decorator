import {Authenticated, BodyParams, Controller, Get, PathParams, Post, Put} from "ts-express-decorators";
import {Calendar} from "../../models/Calendar";
import {CalendarsService} from "../../services/CalendarsService";

import {EventCtrl} from "./EventCtrl";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 *
 * In this case, EventCtrl is a dependency of CalendarCtrl.
 * All routes of EventCtrl will be mounted on the `/calendars` path.
 */
@Controller("/calendars", EventCtrl)
export class CalendarCtrl {

    constructor(private calendarsService: CalendarsService) {

    }

    @Get("/:id")
    @Authenticated()
    find(@PathParams("id") id: string): Promise<Calendar> {
        return this.calendarsService.find(id);
    }

    @Post("/")
    @Authenticated()
    save(@BodyParams() calendar: Calendar) {
        return this.calendarsService.create(calendar);
    }

    @Put("/:id")
    @Authenticated()
    update(@PathParams("id") id: string,
           @BodyParams() calendar: Calendar) {
        return this.calendarsService.update(calendar);
    }

    @Get("/")
    //@Authenticated()
    query() {
        return this.calendarsService.query();
    }

}