import { test, ContextualTestContext } from "ava";
import * as supertest from "supertest";
import * as HTTPStatus from "http-status";
import { request } from "../test-helper";

const createPost = (t: ContextualTestContext): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const url = "/posts";
    request
      .post(url)
      .send({ body: "Hello, world!" })
      .expect(HTTPStatus.CREATED)
      .expect("Content-type", /^application\/json/)
      .end((err: Error, res: supertest.Response) => {
        t.is(null, err, `POST ${url} err was not null`);
        if (err) {
          return reject(err);
        }

        t.is("number", typeof res.body.id, `POST ${url} body.id was not a number`);
        resolve(res.body.id);
      });
  });
};

test("Post creation endpoint Should return the new post's id", async (t) => createPost(t));

test("Post endpoint Should return a post", async (t) => {
  const id = await createPost(t);
  return new Promise<void>((resolve, reject) => {
    const url = `/post/${id}`;
    request
      .get(url)
      .expect(HTTPStatus.OK)
      .expect("Content-type", /^application\/json/)
      .end(function getPostEnd(err: Error) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
  });
});

test("Post endpoint Should delete a post", async (t) => {
  const id = await createPost(t);
  return new Promise<void>((resolve, reject) => {
    const url = `/post/${id}`;
    request
      .delete(url)
      .expect(HTTPStatus.OK)
      .expect("Content-type", /^application\/json/)
      .end(function getPostEnd(err: Error) {
        if (err) {
          return reject(err);
        }

        resolve();
      });
  });
});

test("Post endpoint Should update a post", async (t) => {
  const id = await createPost(t);
  return new Promise<void>((resolve, reject) => {
    const url = `/post/${id}`;
    const body = { body: "Jello, world!" };
    request
      .put(url)
      .send(body)
      .expect(HTTPStatus.OK)
      .expect("Content-type", /^application\/json/)
      .end(function getPostEnd(err: Error, res: supertest.Response) {
        if (err) {
          return reject(err);
        }

        t.is(body.body, res.body.body, `PUT ${url} request and response bodies did not match`);
        resolve();
      });
  });
});
