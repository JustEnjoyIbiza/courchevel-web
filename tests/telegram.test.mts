/**
 * Tests for the Telegram setup helper's chat finder. Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chatsFrom } from '../scripts/telegram.mjs';

test('finds a group the bot was added to and a private chat, once each', () => {
  const updates = [
    { my_chat_member: { chat: { id: -4512345678, type: 'group', title: 'CLC Leads' } } },
    { message: { chat: { id: -4512345678, type: 'group', title: 'CLC Leads' }, text: 'hello' } },
    { message: { chat: { id: 123456789, type: 'private', first_name: 'Alin', last_name: 'L' }, text: '/start' } },
  ];
  assert.deepEqual(chatsFrom(updates), [
    { id: -4512345678, type: 'group', name: 'CLC Leads' },
    { id: 123456789, type: 'private', name: 'Alin L' },
  ]);
});

test('a group upgraded to a supergroup gives its new id', () => {
  const updates = [{ message: { chat: { id: -4512345678, type: 'group', title: 'CLC Leads' }, migrate_to_chat_id: -1002233445566 } }];
  assert.deepEqual(chatsFrom(updates), [{ id: -1002233445566, type: 'supergroup', name: 'CLC Leads' }]);
});
