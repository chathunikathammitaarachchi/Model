const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose'); 
const connectDB = require("../config/db");
describe('Event API', () => {
  it('should fetch events from the server', async () => {
    const response = await request(app).get('/api/events');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new event', async () => {
    const newEvent = {
      title: 'New Event',
      date: '2024-11-24',
      time: '10:00 AM',
    };

    const response = await request(app)
      .post('/api/events')
      .send(newEvent)
      .set('Content-Type', 'application/json');
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'New Event');
    expect(response.body).toHaveProperty('date', expect.stringContaining('2024-11-24'));
    expect(response.body).toHaveProperty('time', '10:00 AM');
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});