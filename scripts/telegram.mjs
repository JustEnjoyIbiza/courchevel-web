/**
 * Telegram lead alerts: setup helper. The lead function sends the real alerts
 * (netlify/lib/integrations.ts); this finds the chat to send them to and checks
 * that one arrives:
 *
 *   npm run telegram -- chats   list the chats the bot has been added to or messaged from
 *   npm run telegram -- test    send a sample alert, built like a real one, to TELEGRAM_CHAT_ID
 *
 * Keys come from .env (see .env.example and docs/lead-system-setup.md).
 */
import { fileURLToPath } from 'node:url';
import { sendTelegram } from '../netlify/lib/integrations.ts';
import { telegramAlert } from '../netlify/lib/messages.ts';

const API = 'https://api.telegram.org/bot';

function token() {
  if (!process.env.TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is missing in .env (the token from @BotFather).');
  return process.env.TELEGRAM_BOT_TOKEN;
}

/** Chats seen in the bot's recent updates: messages, and being added to a group. */
export function chatsFrom(updates) {
  const chats = new Map();
  for (const u of updates) {
    const m = u.message ?? u.edited_message ?? u.channel_post ?? u.my_chat_member;
    if (!m?.chat) continue;
    const id = m.migrate_to_chat_id ?? m.chat.id;
    const name = m.chat.title || [m.chat.first_name, m.chat.last_name].filter(Boolean).join(' ') || m.chat.username || '';
    chats.set(id, { id, type: m.migrate_to_chat_id ? 'supergroup' : m.chat.type, name });
  }
  return [...chats.values()];
}

async function chats() {
  const res = await fetch(`${API}${token()}/getUpdates`);
  const body = await res.json();
  if (!body.ok) throw new Error(`Telegram: ${body.description}`);
  const found = chatsFrom(body.result);
  if (!found.length) {
    console.log('No chats yet. Add the bot to your group (or press Start in a chat with it), send a message there, then run this again.');
    return;
  }
  for (const c of found) console.log(`${String(c.id).padEnd(16)} ${c.type.padEnd(11)} ${c.name}`);
  console.log('\nPut the id of the chat that should get alerts in TELEGRAM_CHAT_ID.');
}

/** A table request that reads like a real one and says it is a test. */
const sample = {
  kind: 'request',
  requestType: 'table',
  service: 'nightlife',
  item: 'Bagatelle',
  from: '',
  to: '',
  date: '2026-12-28',
  dateTo: '',
  time: '13:00',
  flight: '',
  guests: 2,
  details: 'Test from the setup script: no one to call back.',
  staying: '',
  name: 'TEST – sample alert',
  email: 'test@example.com',
  phone: '',
  preferredContact: 'email',
  consent: true,
  locale: 'en',
  page: '/guides/where-to-eat/',
  referrer: '',
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
};

async function test() {
  token();
  if (!process.env.TELEGRAM_CHAT_ID) throw new Error('TELEGRAM_CHAT_ID is missing in .env. Run: npm run telegram -- chats');
  const text = `<i>Test: this is what a lead alert looks like.</i>\n\n${telegramAlert(sample)}`;
  await sendTelegram(process.env, text);
  console.log(`Sample alert sent to chat ${process.env.TELEGRAM_CHAT_ID}.`);
}

const commands = { chats, test };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const run = commands[process.argv[2]];
  if (!run) {
    console.error('Usage: npm run telegram -- chats | test');
    process.exit(1);
  }
  run().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
