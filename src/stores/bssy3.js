import { writable } from "svelte/store";
// import {ads} from "./ads"
// import {message} from "./message"
// import {reads} from "./reads"
import UuidObj  from "../lib/jslib/uuid";


let ads = [], message = [], reads =[]




//parameters
let programmeName = "BSSY";
let yearNumber = 3;
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
    new CourseObj("GROUP DYNAMICS","EXT314","CORE",3.0,
        [
            new WeekdayObj("Monday",1, "10", "12", "HALL", "LECTURE")
            
        ] 
    ),
    new CourseObj("DESIGN AND ANALYSIS OF EXPERIMENTS","BSC311","NON CORE",3.0,
        [
            new WeekdayObj("Monday",1, "17", "19", "MPH", "LECTURE"),
            new WeekdayObj("Friday",5, "16", "18", "MPH", "TUTORIAL")
            
        ] 
    ),
    new CourseObj("FARM BUSINESS MANAGEMENT","AAE314","NON CORE",2.0,
        [
            new WeekdayObj("Tuesday",2, "11", "12", "CALT 2", "TUTORIAL"),
            new WeekdayObj("Thursday",4, "08", "10", "CALT 2", "LECTURE")
            
        ] 
    ),

    //tuesday
    new CourseObj("SOIL CHEMISTRY AND FERTILITY","SSC312","CORE",3.0,
        [
            new WeekdayObj("Tuesday",2, "13", "15", "SOIL LAB", "PRACTICAL"),
            new WeekdayObj("Wednesday",3, "11", "13", "CALT 2", "LECTURE")
            
        ] 
    ),


    //thursday
    new CourseObj("POST HARVEST SEED MANAGEMENT","SSY411","CORE",3.0,
        [
            new WeekdayObj("Thursday", 4, "10", "12", "ROOM 1", "tutorial"),
            new WeekdayObj("Friday", 5, "14", "18", "LT 1", "lecture")
            
        ] 
    ),
    new CourseObj("POST HARVEST SEED MANAGEMENT","SSY411","CORE",3.0,
        [
            new WeekdayObj("Thursday", 4, "10", "12", "ROOM 1", "tutorial"),
            new WeekdayObj("Friday", 5, "14", "18", "LT 1", "lecture")
            
        ] 
    ),

]




export const data = writable({ courses, common, reads, message, ads })



