/**
 * Tests for the Cloudinary sync script's request signing. Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sign, publicIdFor } from '../scripts/cloudinary.mjs';

test('signature matches Cloudinary’s documented example', () => {
  // https://cloudinary.com/documentation/authentication_signatures
  const params = { eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop', public_id: 'sample_image', timestamp: 1315060510 };
  assert.equal(sign(params, 'abcd'), 'bfd09f95f331f558cbd1320e67aa8d488770583e');
});

test('empty params are left out of the signature', () => {
  assert.equal(sign({ public_id: 'a', timestamp: 1, folder: '' }, 's'), sign({ public_id: 'a', timestamp: 1 }, 's'));
});

test('public ID is folder plus file name without extension', () => {
  assert.equal(publicIdFor('helicopter-landing-pines.jpeg', 'courchevel'), 'courchevel/helicopter-landing-pines');
});
