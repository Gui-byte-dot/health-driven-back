CREATE TABLE "doctor" (
	"id" serial PRIMARY KEY,
	"crm" integer,
	"nome" varchar,
	"especialidade" varchar,
	"image" VARCHAR(255),
	"email" VARCHAR(255),
	"password" VARCHAR(255),
);




CREATE TABLE "patient" (
	"id" serial NOT NULL,
	"cpf" varchar NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"image" VARCHAR(255) NOT NULL,
	CONSTRAINT "patient_pk" PRIMARY KEY ("id")
);



CREATE TABLE "horaries" (
	"id" serial NOT NULL,
	"doctor_id" integer NOT NULL,
	"horario" TIMESTAMP NOT NULL,
	"disponivel" BOOLEAN NOT NULL,
	CONSTRAINT "horaries_pk" PRIMARY KEY ("id")
);

CREATE TABLE "doctorSessions" (
	"token" VARCHAR(32) NOT NULL UNIQUE,
	"userId" integer NOT NULL
);

CREATE TABLE "patientSessions" (
	"token" VARCHAR(32) NOT NULL UNIQUE,
	"userId" integer NOT NULL
);





CREATE TABLE "consulting" (
	"id" serial NOT NULL,
	"patient_id" integer NOT NULL,
	"finished" BOOLEAN NOT NULL,
	CONSTRAINT "consulting_pk" PRIMARY KEY ("id")
);

ALTER TABLE "horaries" ADD CONSTRAINT "horaries_fk0" FOREIGN KEY ("doctor_id") REFERENCES "doctor"("id");

ALTER TABLE "consulting" ADD CONSTRAINT "consulting_fk0" FOREIGN KEY ("patient_id") REFERENCES "patient"("id");