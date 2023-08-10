import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { server } from "../src/server";

const TEST_PORT = 3002;

const DUMMY_ID = "abcdef";

const TEST_ENTRY: Entry = {
  id: "99999",
  title: "Title",
  description: "Description",
  created_at: new Date("2023-01-01"),
  scheduled_at: new Date("2023-01-02"),
};

const TEST_POST_ENTRY: Entry = {
  id: "99998",
  title: "Title 2",
  description: "Description 2",
  created_at: new Date("2023-02-01"),
  scheduled_at: new Date("2023-02-02"),
};

beforeAll(async () => {
  await server.listen(TEST_PORT);

  await Prisma.entry.create({
    data: TEST_ENTRY,
  });
});

describe("GET /get/", () => {
  it("should return all entries from the database", async () => {
    const response = await server.inject({ method: "GET", url: "/get/" });
    const body: Entry[] = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.length).toBeGreaterThan(0);
  });

  it("should return correct entry when id is provided", async () => {
    const response = await server.inject({ method: "GET", url: `/get/${TEST_ENTRY.id}` });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(TEST_ENTRY));
  });

  it("should return status code 500 for invalid id at /get/:id", async () => {
    const response = await server.inject({ method: "GET", url: `/get/${DUMMY_ID}` });

    expect(response.statusCode).toBe(500);
  });
});

describe("PUT /update/:id", () => {
  it("should update single entry in database with valid id", async () => {
    const updatedEntry: Entry = {
      ...TEST_ENTRY,
      title: "Title Updated",
    };
    const response = await server.inject({ method: "PUT", url: `/update/${TEST_ENTRY.id}`, payload: updatedEntry });
    const body: { msg: string } = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.msg).toEqual("Updated successfully");
  });

  it("should not update single entry in database with invalid id", async () => {
    const response = await server.inject({ method: "PUT", url: `/update/${DUMMY_ID}`, payload: TEST_ENTRY });
    const body: { msg: string } = await response.json();

    expect(response.statusCode).toBe(500);
    expect(body.msg).toEqual("Error updating");
  });
});

describe("DELETE /delete/:id", () => {
  it("should delete single entry in database with valid id", async () => {
    const newEntry: Entry = {
      ...TEST_ENTRY,
      id: "99997",
    };
    await server.inject({ method: "POST", url: `/create/`, payload: newEntry });
    const response = await server.inject({ method: "DELETE", url: `/delete/${newEntry.id}` });
    const body: { msg: string } = await response.json();

    expect(response.statusCode).toBe(200);
    expect(body.msg).toEqual("Deleted successfully");
  });

  it("should give error on deletion if invalid id is provided", async () => {
    const response = await server.inject({ method: "DELETE", url: `/delete/${DUMMY_ID}` });
    const body: { msg: string } = await response.json();

    expect(response.statusCode).toBe(500);
    expect(body.msg).toEqual("Error deleting entry");
  });
});

describe("POST /create", () => {
  it("should be able to add a new entry to the database", async () => {
    const response = await server.inject({ method: "POST", url: `/create/`, payload: TEST_POST_ENTRY });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(TEST_POST_ENTRY));

    await Prisma.entry.delete({ where: { id: TEST_POST_ENTRY.id } });
  });

  it("should not be able to add duplicate ids in database", async () => {
    const response = await server.inject({ method: "POST", url: `/create/`, payload: TEST_ENTRY });

    expect(response.statusCode).toBe(500);
  });
});

afterAll(async () => {
  await Prisma.entry.delete({ where: { id: TEST_ENTRY.id } });
  await server.close();
});
