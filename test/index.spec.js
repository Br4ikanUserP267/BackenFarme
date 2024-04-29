import request from "supertest";
import app from "../src/app";

describe("GET /farms", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/farms").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond an array", async () => {
    const response = await request(app).get("/farms").send();
    expect(Array.isArray(response.body)).toBe(true);
  });
});


describe('GET /farms/:id', () => {
    test('should respond with a 200 status code and success message', async () => {
      const response = await request(app).delete('/farms/545421234');
      
      expect(response.statusCode).toBe(200);
    });
  });
 


describe('DELETE /farms/:id', () => {
    test('should respond with a 200 status code and success message', async () => {
      const response = await request(app).delete('/farms/1');
      
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Registro eliminado correctamente');
    });
  });
 