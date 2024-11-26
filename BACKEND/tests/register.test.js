const request = require('supertest'); 
const app = require('../server');
const User = require('../models/User') 
const mongoose = require('mongoose');


describe('POST /api/auth/register', () => {
  it('should create a new user and return success', async () => {
    const newUser = {
      username:'testuser1',
      email: 'testuser@example.com',
      password: 'testpassword123',
      role:'photographer'
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser);

   
    expect(res.status).toBe(201); 
    expect(res.body.message).toBe('User registered successfully'); 
    const user = await User.findOne({ email: 'testuser@example.com' });
    expect(user).toBeTruthy();  
  });

  it('should return an error if the email is already taken', async () => {
    const existingUser = {
      username:'testuser2',
      email: 'existinguser@example.com',
      password: 'testpassword123',
      role : 'model'
    };

    
    await request(app)
      .post('/api/auth/register')
      .send(existingUser);

   
    const res = await request(app)
      .post('/api/auth/register')
      .send(existingUser);

   
    expect(res.status).toBe(400); 
    expect(res.body.message).toBe('User already exists'); 
  });
});
