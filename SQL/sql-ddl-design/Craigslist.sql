-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Region" (
    "regionID" int   NOT NULL,
    "City" string   NOT NULL,
    "timezone" string   NOT NULL,
    CONSTRAINT "pk_Region" PRIMARY KEY (
        "regionID"
     )
);

CREATE TABLE "USER" (
    "userID" int   NOT NULL,
    "username" string   NOT NULL,
    "preferred_region" int   NOT NULL,
    CONSTRAINT "pk_USER" PRIMARY KEY (
        "userID"
     )
);

CREATE TABLE "Posts" (
    "postID" int   NOT NULL,
    "title" string   NOT NULL,
    "text" string   NOT NULL,
    "user" int   NOT NULL,
    "location" string   NOT NULL,
    "region" int   NOT NULL,
    "category" int   NOT NULL,
    CONSTRAINT "pk_Posts" PRIMARY KEY (
        "postID"
     )
);

CREATE TABLE "Categories" (
    "catID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_Categories" PRIMARY KEY (
        "catID"
     )
);

ALTER TABLE "USER" ADD CONSTRAINT "fk_USER_preferred_region" FOREIGN KEY("preferred_region")
REFERENCES "Region" ("regionID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_user" FOREIGN KEY("user")
REFERENCES "USER" ("userID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_region" FOREIGN KEY("region")
REFERENCES "Region" ("regionID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_category" FOREIGN KEY("category")
REFERENCES "Categories" ("catID");

