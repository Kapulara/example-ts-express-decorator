import {ConverterService, Service} from "ts-express-decorators";
import {Calendar, CalendarModel} from "../models/Calendar";

@Service()
export class CalendarsService {

    constructor(private converterService: ConverterService) {

        CalendarModel
            .find({})
            .exec()
            .then((calendars: any[]) => {
                if (calendars.length === 0) {
                    CalendarModel.create(...require("./../resources/calendars.json"));
                }
            })
            .catch(err => console.error(err));

    }

    /**
     *
     * @param model
     */
    private deserialize = (model): Calendar =>
        this.converterService.deserialize(model, Calendar) as Calendar;


    /**
     * Find a calendar by his ID.
     * @param id
     * @returns {undefined|Calendar}
     */
    public find = (id: string): Promise<Calendar> =>
        CalendarModel
            .findById(id)
            .exec()
            .then(calendar => this.deserialize(calendar));


    /**
     * Create a new Calendar
     * @returns {{id: any, name: string}}
     * @param calendar
     */
    public create = (calendar: Calendar): Promise<Calendar> =>
        CalendarModel
            .create(calendar)
            .then(calendar => this.deserialize(calendar));


    /**
     *
     * @returns {Calendar[]}
     */
    public query = (): Promise<Calendar[]> =>
        CalendarModel.find().exec()
            .then(calendars =>
                calendars.map(calendar => this.deserialize(calendar))
            );

    /**
     *
     * @param calendar
     * @returns {Calendar}
     */
    public update(calendar: Calendar): Promise<Calendar> {

        return CalendarModel
            .findById(calendar._id)
            .exec()
            .then(calendarResult => {

                delete calendar._id;
                Object.assign(calendarResult, calendar);

                return calendarResult.save();
            })
            .then<Calendar>(calendar => this.deserialize(calendar));
    }
}