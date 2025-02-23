import request from "supertest";
import { app, server } from "../server.js";

// Ensure server starts before tests
beforeAll((done) => {
  server.listen(() => done());
});

// Ensure server closes after tests
afterAll((done) => {
  if (server && server.close) {
    server.close(done);
  } else {
    done();
  }
});

describe("GET /projects", () => {
  it("should return a list of projects", async () => {
    const res = await request(app).get("/projects"); // ✅ Use `app`, not `server`
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});