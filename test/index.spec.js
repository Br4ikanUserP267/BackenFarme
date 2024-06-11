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
 



describe("GET /staff", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/staff").send();
      expect(response.statusCode).toBe(200);
    });
  
    test("should respond an array", async () => {
      const response = await request(app).get("/staff").send();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /tasks", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/staff").send();
      expect(response.statusCode).toBe(200);
    });
  
    test("should respond an array", async () => {
      const response = await request(app).get("/staff").send();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("GET /tasks", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/tasks").send();
      expect(response.statusCode).toBe(200);
    });
  
    test("should respond an array", async () => {
      const response = await request(app).get("/tasks").send();
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("Staff routes", () => {
    it("should get all staff members", async () => {
      const response = await request(app).get("/staff");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
     
    });
  
    it("should get a specific staff member by ID", async () => {
      const id = "2"; 
      const response = await request(app).get(`/staff/${id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
      // Añade más expectativas según la respuesta esperada
    });
  
    // Añade más pruebas para las otras rutas como postStaff, updateStaff, deleteStaff, etc.
  });


  
  