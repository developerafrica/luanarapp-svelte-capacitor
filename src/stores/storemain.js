import { writable } from "svelte/store";
// import {ads} from "./ads"
// import {message} from "./message"
// import {reads} from "./reads"
import UuidObj  from "../lib/jslib/uuid";


let ads = [], message = [], reads =[]




//parameters
let programmeName = "BAGR";
let yearNumber = 4;
let semesterNumber = 1;
let versionNumber = "1.1.1";
let siteName = "https://butaopeter.netlify.app";
let mailName = "peterethanbutao:gmail.com"



class CommonObj {
    constructor(prog, sy, sem, ver, aut, air, tnm, site, mail) {
        this.programme = prog;
        this.studyYear = sy;
        this.semester = sem;
        this.version = ver;
        this.authour = aut;
        this.phone = {
            airtel: air,
            tnm: tnm
        },
            this.website = site;
        this.gmail = mail;
    }
}

const common = [new CommonObj(programmeName, yearNumber, semesterNumber, versionNumber, "peter butao", "0991894703", "0880164455", siteName, mailName)];


class WeekdayObj {
    constructor(wd, dy, intm, fntm, loc, typ) {
        this.weekday = wd;
            this.day = dy;
        this.initialTime = `${intm}:00`;
            this.finalTime = `${fntm}:00`;
            this.location = loc.toUpperCase();
            this.type = typ;
            this.hours = fntm - intm;
    }
}



class CourseObj {
    constructor(crs, cd, typ, gpa, wd) {
        this.id = UuidObj.uuid();
        this.date = CourseObj.date();
        this.course = crs.toUpperCase();
        this.type = typ;
        this.gpa = gpa;
        this.code = cd;
        this.weekdays = wd;
    }
    static date() {
        return new Date().getDate()
    }

}



const courses = [
    //monday
    new CourseObj("HYDROLOGY AND AGRO-METEOROLOGY","IRE311","NON CORE",3.0,
        [
            new WeekdayObj("Monday",1, "07", "08", "ROOM 2", "LECTURE"),
            new WeekdayObj("Monday",1, "10", "12", "LT 2", "LECTURE"),
            
            
        ] 
    ),
    new CourseObj("AGRONOMY OF INDUSTRIAL CROPS","AGN413","CORE",3.0,
        [
            new WeekdayObj("Monday",1, "14", "16", "LT 2", "LECTURE"),
            new WeekdayObj("Tuesday",2, "10", "12", "LAB / FIELD", "PRACTICAL")
           
            
        ] 
        ),
    //TUESDAY//
    new CourseObj("MUSHROOM PRODUCTION TECHNOLOGY","HOR313","NON CORE",3.0,
        [

            new WeekdayObj("Tuesday",2, "09", "10", "LT 5", "LECTURE"),
            new WeekdayObj("Wednesday", 3, "13", "15", "PLANT LAB ", "PRACTICAL"),
            new WeekdayObj("Thursday",4, "09", "10", "LT 6", "LECTURE")
            
        ] 
    ),

    new CourseObj("RUMINANT PRODUCTION","ANS418","NON CORE",3.5,
        [
            new WeekdayObj("Tuesday",2, "13", "14", "LT 6", "LECTURE"),
            new WeekdayObj("Wednesday", 3, "12", "13", "LT 6", "LECTURE"),
            new WeekdayObj("Friday",5, "13", "15", "ANS LAB", "PRACTICAL")
            
        ] 
    ),
    //WEDNESDAY
    new CourseObj("ENTREPRENEURSHIP 1","ABM213","CORE",2.5,
        [

            new WeekdayObj("Wednesday", 3, "18", "20", "MPH ", "LECTURE"),
            new WeekdayObj("Thursday",4, "19", "20", "MPH", "LECTURE")
            
        ] 
    ),
    //
    //thursday
    new CourseObj("AGRICULTURAL ENTOMOLOGY","AGN416","CORE",2.5,
        [
            new WeekdayObj("Wednesday", 3, "11", "12", "LT 3", "TUTORIAL"),
            new WeekdayObj("Thursday", 4, "10", "12", "LT 2", "LECTURE")
            
        ] 
    )

]




export const data = writable({ courses, common, reads, message, ads })



