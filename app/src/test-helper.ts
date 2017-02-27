import * as supertest from "supertest";

export const request = supertest(`http://${process.env["API_HOST"]}:${process.env["API_PORT"]}`);
