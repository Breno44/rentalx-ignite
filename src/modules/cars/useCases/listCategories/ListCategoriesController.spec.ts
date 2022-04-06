import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../../shared/infra/Http/app";

import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("List Categories Contoller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuidv4();

    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'ABCD')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentalx.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category Description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const categoriesResponse = await request(app).get("/categories");

    expect(categoriesResponse.status).toBe(200);
    expect(categoriesResponse.body.length).toBe(1);
    expect(categoriesResponse.body[0]).toHaveProperty("id");
    expect(categoriesResponse.body[0].name).toEqual("Category Test");
  });
});
