-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Teams" (
    "teamID" int   NOT NULL,
    "name" string   NOT NULL,
    "region" string   NOT NULL,
    "league" string   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "teamID"
     )
);

CREATE TABLE "Goals" (
    "match" int   NOT NULL,
    "player" int   NOT NULL
);

CREATE TABLE "Players" (
    "playerID" int   NOT NULL,
    "name" string   NOT NULL,
    "position" string   NOT NULL,
    "team" int   NOT NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "playerID"
     )
);

CREATE TABLE "Match" (
    "matchID" int   NOT NULL,
    "matchdate" date   NOT NULL,
    "location" string   NOT NULL,
    "team1" int   NOT NULL,
    "team2" int   NOT NULL,
    CONSTRAINT "pk_Match" PRIMARY KEY (
        "matchID"
     )
);

CREATE TABLE "Referees" (
    "refID" int   NOT NULL,
    "name" string   NOT NULL,
    CONSTRAINT "pk_Referees" PRIMARY KEY (
        "refID"
     )
);

CREATE TABLE "Ref_Assignments" (
    "matchID" int   NOT NULL,
    "refID" int   NOT NULL
);

CREATE TABLE "Season" (
    "name" string   NOT NULL,
    "startdate" date   NOT NULL,
    "enddate" date   NOT NULL,
    "league" string   NOT NULL
);

ALTER TABLE "Teams" ADD CONSTRAINT "fk_Teams_league" FOREIGN KEY("league")
REFERENCES "Season" ("league");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_match" FOREIGN KEY("match")
REFERENCES "Match" ("matchID");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_player" FOREIGN KEY("player")
REFERENCES "Players" ("playerID");

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_team" FOREIGN KEY("team")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Match" ADD CONSTRAINT "fk_Match_team1" FOREIGN KEY("team1")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Match" ADD CONSTRAINT "fk_Match_team2" FOREIGN KEY("team2")
REFERENCES "Teams" ("teamID");

ALTER TABLE "Ref_Assignments" ADD CONSTRAINT "fk_Ref_Assignments_matchID" FOREIGN KEY("matchID")
REFERENCES "Match" ("matchID");

ALTER TABLE "Ref_Assignments" ADD CONSTRAINT "fk_Ref_Assignments_refID" FOREIGN KEY("refID")
REFERENCES "Referees" ("refID");

