-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Doctors" (
    "doctorid" int   NOT NULL,
    "name" string   NOT NULL,
    "title" string   NOT NULL,
    "hiredate" date   NOT NULL,
    "contractstatus" boolen   NOT NULL,
    "phone" int   NOT NULL,
    "email" string   NOT NULL,
    CONSTRAINT "pk_Doctors" PRIMARY KEY (
        "doctorid"
     )
);

CREATE TABLE "Patients" (
    "patientid" int   NOT NULL,
    "name" string   NOT NULL,
    "phone" int   NOT NULL,
    "email" string   NOT NULL,
    "address" string   NOT NULL,
    "birthdate" date   NOT NULL,
    CONSTRAINT "pk_Patients" PRIMARY KEY (
        "patientid"
     )
);

CREATE TABLE "Diseases" (
    "diseasesId" int   NOT NULL,
    "name" string   NOT NULL,
    "type" string   NOT NULL,
    "description" string   NOT NULL,
    CONSTRAINT "pk_Diseases" PRIMARY KEY (
        "diseasesId"
     )
);

CREATE TABLE "patients_diseases" (
    "patient" int   NOT NULL,
    "disease" int   NOT NULL
);

CREATE TABLE "Care_list" (
    "doctor" int   NOT NULL,
    "patient" int   NOT NULL
);

ALTER TABLE "patients_diseases" ADD CONSTRAINT "fk_patients_diseases_patient" FOREIGN KEY("patient")
REFERENCES "Patients" ("patientid");

ALTER TABLE "patients_diseases" ADD CONSTRAINT "fk_patients_diseases_disease" FOREIGN KEY("disease")
REFERENCES "Diseases" ("diseasesId");

ALTER TABLE "Care_list" ADD CONSTRAINT "fk_Care_list_doctor" FOREIGN KEY("doctor")
REFERENCES "Doctors" ("doctorid");

ALTER TABLE "Care_list" ADD CONSTRAINT "fk_Care_list_patient" FOREIGN KEY("patient")
REFERENCES "Patients" ("patientid");

