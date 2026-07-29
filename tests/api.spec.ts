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