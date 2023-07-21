import mongoose from "mongoose";
import  * as schemas from "../schema/schemas.js";

export const Question = mongoose.model('Question', schemas.questionSchema, 'question');
export const Entrant = mongoose.model('Entrant', schemas.entrantSchema, 'entrants');
export const Entry = mongoose.model('Entry', schemas.entrySchema, 'entry');
export const PurposeOfVisit = mongoose.model('PurposeOfVisit', schemas.purposeOfVisitSchema, 'purpose_of_visit')

