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
  

  describe('POST /staff', () => {
    test('should respond with a 200 status code and success message for valid data', async () => {
      const newStaff = {
        Id: 212, Name:"brito", BirthDate:"11-11-11", Farm_Id:1, IsDelete:0, Username, Password 
      };
  
      const mockInsertStaff = jest.fn().mockReturnValueOnce([]);
      pool.query = mockInsertStaff;
  
      const response = await request(app).post('/staff').send(newStaff);
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Registro de personal agregado correctamente');
    });
  
    test('should respond with a 400 status code for missing required data', async () => {
      const incompleteStaff = { Name: 'John Doe' }; // Missing required fields
  
      const response = await request(app).post('/staff').send(incompleteStaff);
      expect(response.statusCode).toBe(500); // Adjust based on your error handling
    });
  });
  