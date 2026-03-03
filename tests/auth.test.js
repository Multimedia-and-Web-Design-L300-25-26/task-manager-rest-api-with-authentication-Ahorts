import request from "supertest";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import app from "../src/app.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  // Clean up test users
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
  await mongoose.disconnect();
});

describe("Auth Routes", () => {

  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});