import mongoose from "mongoose";
const { Schema } = mongoose;

export const questionSchema = new Schema({
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
    family_members_accompanying: Number,
})

export const entrySchema = new Schema({
    id: Number,
    entrant_id: Number,
    occupation: String,
    date_of_entry: Date,
    passport_number: String,
    country_of_issue: String,
    flight_name: String,
    flight_number: String,
    departure_port: String,
    purpose_of_visit: String,
    contact_info: String
})

export const purposeOfVisitSchema = new Schema({
    purpose: String,
    slug: String,
})

export const promptSchema = new Schema({
    prompt: String,
    enabled: Boolean
})