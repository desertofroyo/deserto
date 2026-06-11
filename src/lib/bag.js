/* Deserto — the shopping bag persists in localStorage so the marketing
   header and the order page stay in sync (same origin). */
export const BAG_KEY = "deserto.bag.v1";

export function loadBag() {
  try { return JSON.parse(localStorage.getItem(BAG_KEY) || "[]"); }
  catch (e) { return []; }
}

export function saveBag(b) {
  try { localStorage.setItem(BAG_KEY, JSON.stringify(b)); } catch (e) { /* ignore quota */ }
}

export function readBagCount() {
  return loadBag().reduce((a, x) => a + x.qty, 0);
}
