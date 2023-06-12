CREATE TABLE "doctor" (
	"id" serial PRIMARY KEY,
	"crm" integer NOT NULL,
	"nome" character varying(50) NOT NULL,
	"especialidade" character varying(50) NOT NULL,
	"image" character varying(50) NOT NULL,
	"email" character varying(50) NOT NULL,
	"password" character varying(255) NOT NULL,
);




CREATE TABLE "patient" (
	"id" serial PRIMARY KEY,
	"cpf" BIGINT NOT NULL,
	"name" character varying(50) NOT NULL,
	"data_nascimento" DATE NOT NULL,
	"email" character varying(50) NOT NULL,
	"password" character varying(255) NOT NULL,
	"image" character varying(50) NOT NULL,
);



CREATE TABLE "appointments" (
	"id" serial NOT NULL,
	"doctor_id" integer NOT NULL,
	"patient_id" integer NOT NULL,
	"date" DATE,
	"hours" TIME WITHOUT TIME ZONE,
	CONSTRAINT "appointments_pk" PRIMARY KEY ("id")
);

CREATE TABLE "doctorSessions" (
	"token" VARCHAR(32) NOT NULL UNIQUE,
	"userId" integer NOT NULL
);

CREATE TABLE "patientSessions" (
	"token" VARCHAR(50) NOT NULL UNIQUE,
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