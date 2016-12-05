/// <reference path="../typings/index.d.ts" />
import * as supertest from "supertest";

export const request = supertest("http://ApiServer:8080");