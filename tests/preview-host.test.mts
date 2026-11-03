/**
 * Netlify addresses get noindex, the real domain does not. Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPreviewHost } from '../src/lib/preview-host.ts';
import noindex from '../netlify/edge-functions/noindex-previews.ts';

test('only *.netlify.app addresses count as previews', () => {
  assert.equal(isPreviewHost('preview--courchevel-luxury-concierge.netlify.app'), true);
  assert.equal(isPreviewHost('courchevel-luxury-concierge.netlify.app'), true);
  assert.equal(isPreviewHost('www.courchevelluxuryconcierge.com'), false);
  assert.equal(isPreviewHost('courchevelluxuryconcierge.com'), false);
  assert.equal(isPreviewHost('netlify.app.example.com'), false);
});

test('the edge function adds noindex on a preview and passes the real domain through', async () => {
  const page = () => Promise.resolve(new Response('<h1>ok</h1>', { status: 200, headers: { 'content-type': 'text/html' } }));
  const preview = await noindex(new Request('https://preview--courchevel-luxury-concierge.netlify.app/'), { next: page });
  assert.equal(preview?.headers.get('x-robots-tag'), 'noindex');
  assert.equal(await preview?.text(), '<h1>ok</h1>');
  const production = await noindex(new Request('https://www.courchevelluxuryconcierge.com/'), { next: page });
  assert.equal(production, undefined);
});
