import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('Consultar usuários', async ({ request }) => {

    const response = await request.get(
        'https://reqres.in/api/users?page=2',
        {
            headers: {
                'x-api-key': process.env.REQRES_API_KEY!
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);
    expect(body.data).toHaveLength(6);
    expect(body.data[0].id).toBe(7);
    expect(body.data[0].first_name).toBe('Michael');
    expect(body.data[0].email).toBe('michael.lawson@reqres.in');

});

test('Cadastrar um usuário', async ({ request }) => {
  const response = await request.post(
    'https://reqres.in/api/users',
    {
      headers: {
        'x-api-key': process.env.REQRES_API_KEY!
      },
      data: {
        name: 'Taise',
        job: 'QA Automation'
      }
    }
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.name).toBe('Taise');
  expect(body.job).toBe('QA Automation');
  expect(body.id).toBeDefined();
  expect(body.createdAt).toBeDefined();
});

test('Atualizar um usuário', async ({ request }) => {

  const response = await request.put(
    'https://reqres.in/api/users/2',
    {
      headers: {
        'x-api-key': process.env.REQRES_API_KEY!
      },
      data: {
        name: 'Taise',
        job: 'QA Automation'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe('Taise');
  expect(body.job).toBe('QA Automation');
  expect(body.updatedAt).toBeDefined();

});