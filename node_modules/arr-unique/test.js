import test from 'ava'
import u from './'

test('Returns unique objects.', t => {
  t.deepEqual(u([{a: {b: 2}}, {a: {b: 2}}, {a: {b: 3}}]), [{a: {b: 2}}, {a: {b: 3}}])
})

test('Returns unique numbers.', t => {
  t.deepEqual(u([1, 2, 3, 3]), [1, 2, 3])
})

test('Array as args.', t => {
  t.deepEqual(u({a: {b: 1}}, {a: {b: 1}}, {a: {b: 3}}), [{a: {b: 1}}, {a: {b: 3}}])
})
