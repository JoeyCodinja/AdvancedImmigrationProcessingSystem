import mongoose from "mongoose";
const { Schema } = mongoose;

export const questionSchema = new Schema({
    canned_response: Boolean,
    interview_question: Boolean,
    question: String,
    weight: Number,
    category: String,
    id: Number,
})

export const entrantSchema = new Schema({
    id: Number,
    first_name: String,
    middle_name: String,
    last_name: String,
    gender: String,
    date_of_birth: Date,
})

export const entrySchema = new Schema({
    id: Number,
    entrant_id: Number,
    occupation: String,
    date_of_entry: String,
    passport_number: String,
    country_of_issue: String,
    flight_name: String,
    flight_number: String,
    departure_port: String,
    purpose_of_visit: String,
    contact_info: String,
    safety_rating: Number
})

export const purposeOfVisitSchema = new Schema({
    purpose: String,
    slug: String,
})

export const categorySchema = new Schema({
    name: String,
    slug: String
})

export const promptSchema = new Schema({
    prompt: String,
    enabled: Boolean
})

