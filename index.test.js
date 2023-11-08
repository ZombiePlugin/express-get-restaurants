const request = require("supertest");
const app = require("./src/app");
const { DataTypes } = require("sequelize");

describe("Restaurant api", () => {
  test("Verify the GET method doesn't error", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toBe(200);
  });
  test("Verify the GET method returns an array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    expect((response) => {
      response.body[0].name = "AppleBees";
      response.body[1].name = "LittleSheep";
      response.body[2].name = "Spice Grill";
      response.body.toHaveLength(3);
    });
  });
  test("Verify the GET id method returns the correct data", async () => {
    const response = await request(app).get("/restaurants/:id").send("1");
    expect((response) => {
      response.body.name = "AppleBees";
    });
  });
  test("Verify the POST method returns the correct data", async () => {
    const response = await request(app).post("/restaurants/").send({
      name: "Pepe's",
      location: "London",
      cuisine: "Fast food",
    });
    expect((response) => {
      response.body[3].name = "Pepe's";
    });
  });
  test("Verify the PUT method updates the database", async () => {
    const response = await request(app).put("/restaurants/4").send({
      name: "Chicken City",
      location: "London",
      cuisine: "Fast food",
    });
    expect((response) => {
      response.body.name = "Chicken City";
    });
  });
  test("Verify the DELETE method deletes the object", async () => {
    const response = await request(app).delete("/restaurants/4");
    expect((response) => {
      response.body.name = "Chicken City";
    });
  });
});
