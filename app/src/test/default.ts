import { test } from "ava";
import * as supertest from "supertest";
import * as HTTPStatus from "http-status";
import { request } from "../test-helper";

test("Homepage Should return standard greeting", async (t) => {
  return new Promise<void>((resolve, reject) => {
    const url = "/";
    request
      .get(url)
      .end((err: Error, res: supertest.Response) => {
        if (err) {
          return reject(err);
        }

        t.is(res.status, HTTPStatus.OK, "Response code was not OK");
        t.is(/^text\/plain/.test(res.header["content-type"]), true, "Content-type was not text/plain");
        t.is(res.text, "Hello, worlddd!", "Body was not standard greeting");
        resolve();
      });
  });
});

test("Ping endpoint Should respond to standard ping", async () => {
  return new Promise<void>((resolve, reject) => {
    const url = "/ping";
    request
      .get(url)
      .expect(HTTPStatus.OK)
      .expect("Content-type", /^text\/plain/)
      .expect("Pong")
      .end((err: Error) => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
  });
});

test("Json reflection Should return identical Json in response as provided by request", async (t) => {
  return new Promise<void>((resolve, reject) => {
    const url = "/reflection";
    const body = { greeting: "Hello, world!" };
    request
      .post(url)
      .send(body)
      .expect(HTTPStatus.OK)
      .expect("Content-type", /^application\/json/)
      .end((err: Error, res: supertest.Response) => {
        if (err) {
          return reject(err);
        }

        t.deepEqual(body, res.body, "Greetings in request and response match");
        resolve();
      });
  });
});
