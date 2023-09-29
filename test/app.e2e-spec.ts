import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) -> 200', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('OK');
  });
  it('Get All Tasks -> 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/task?pageSize=10&currentPage=1')
      .set('Content-type', 'application/json')
      .expect(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
  it('Get non-existent Task id -> 404 (not found)', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/task/999999999')
      .set('Content-type', 'application/json')
      .expect(404);
  });
  it('Get All Tasks Paginated Check (without page params)-> 400', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/task')
      .set('Content-type', 'application/json')
      .expect(400);
  });
  it('Get All Tasks Paginated Check -> 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/task?pageSize=10&currentPage=1')
      .set('Content-type', 'application/json')
      .expect(200);
    expect(res.body.length).toBeLessThanOrEqual(10);
  });
  it('Create and Delete Task -> 200, 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/task')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing', status: 'OPEN' })
      .expect(201);

    return request(app.getHttpServer())
      .delete(`/api/v1/task/${response.body.id}`)
      .expect(200);
  });
  it('Delete non-existent Task id -> 404 (not found)', async () => {
    await request(app.getHttpServer())
      .delete('/api/v1/task/999999999')
      .set('Content-type', 'application/json')
      .expect(404);
  });
  it('Update non-existent Task id -> 404 (not found)', async () => {
    await request(app.getHttpServer())
      .put('/api/v1/task/9999999')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing', status: 'COMPLETED' })
      .expect(404);
  });

  it('get invalid task id -> 400', () => {
    return request(app.getHttpServer()).get('/api/v1/task/ABC').expect(400);
  });
  it('delete invalid task id -> 400', () => {
    return request(app.getHttpServer()).delete('/api/v1/task/ABC').expect(400);
  });
  it('update invalid task id -> 400', () => {
    return request(app.getHttpServer())
      .put('/api/v1/task/ABC')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing' })
      .expect(400);
  });
  it('update task with invalid status -> 400', () => {
    return request(app.getHttpServer())
      .put('/api/v1/task/123')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing', status: 'INVALID' })
      .expect(400);
  });
  it('get task report with invalid date param (1) -> 400', () => {
    return request(app.getHttpServer())
      .get('/api/v1/task/report?startMonth=ABC&endMonth=XYZ')
      .set('Content-type', 'application/json')
      .expect(400);
  });
  it('get task report with invalid date param (2) -> 400', () => {
    return request(app.getHttpServer())
      .get('/api/v1/task/report?startMonth=2023-88&endMonth=2023-99')
      .set('Content-type', 'application/json')
      .expect(400);
  });
  it('Get All Tasks with out of range Pagination -> 200, return empty', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/task?pageSize=10&currentPage=9999999')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing' })
      .expect(200);
    expect(res.body.length).toBe(0);
  });
  it('Create Task with Invalid Status -> 400', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/task')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing', status: 'XYZ' })
      .expect(400);
  });
  it('Update Task with Invalid Status -> 400', async () => {
    await request(app.getHttpServer())
      .put('/api/v1/task/1')
      .set('Content-type', 'application/json')
      .send({ task: 'created from testing', status: 'ABC' })
      .expect(400);
  });
});
