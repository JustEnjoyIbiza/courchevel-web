/**
 * Swipe right to close a side drawer (the experience details on /experiences/, a native
 * popover). The panel follows the finger and the backdrop fades with it; it closes past a
 * quarter of its width or on a quick flick, otherwise it slides back. Touch only: Esc, a click
 * outside and the Close button already cover mouse and keyboard. Vertical moves keep scrolling
 * the drawer (`touch-action: pan-y` on the panel hands horizontal moves to this script).
 */
export function swipeToClose(drawer: HTMLElement) {
  let pointer = -1;
  let state: 'idle' | 'pending' | 'drag' = 'idle';
  let startX = 0;
  let startY = 0;
  let dx = 0;
  let samples: { x: number; t: number }[] = [];

  drawer.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' || !e.isPrimary) return;
    pointer = e.pointerId;
    state = 'pending';
    startX = e.clientX;
    startY = e.clientY;
    dx = 0;
    samples = [{ x: e.clientX, t: e.timeStamp }];
  });

  drawer.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointer || state === 'idle') return;
    const mx = e.clientX - startX;
    const my = e.clientY - startY;
    if (state === 'pending') {
      if (Math.abs(mx) < 10 && Math.abs(my) < 10) return;
      // A rightward, mostly horizontal move starts the swipe; anything else is left to scrolling.
      if (mx <= 0 || Math.abs(mx) <= Math.abs(my)) {
        state = 'idle';
        return;
      }
      state = 'drag';
      drawer.style.transition = 'none';
      try {
        drawer.setPointerCapture(pointer);
      } catch {
        // The pointer may already be gone; the swipe still ends on pointerup or pointercancel.
      }
    }
    dx = Math.max(0, mx);
    samples.push({ x: e.clientX, t: e.timeStamp });
    samples = samples.filter((s) => e.timeStamp - s.t <= 100);
    drawer.style.translate = `${dx}px 0`;
    drawer.style.setProperty('--swipe', String(Math.min(1, dx / drawer.offsetWidth)));
  });

  const end = (e: PointerEvent) => {
    if (e.pointerId !== pointer) return;
    const dragged = state === 'drag';
    pointer = -1;
    state = 'idle';
    if (!dragged) return;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const speed = first && last && last.t > first.t ? (last.x - first.x) / (last.t - first.t) : 0;
    const close = e.type === 'pointerup' && (dx > drawer.offsetWidth / 4 || (speed > 0.5 && dx > 40));
    // Back to the stylesheet's transition: closing slides on from where the finger left the
    // panel, a short swipe slides it back into place.
    drawer.style.transition = '';
    drawer.style.translate = '';
    drawer.style.removeProperty('--swipe');
    if (close) drawer.hidePopover();
  };
  drawer.addEventListener('pointerup', end);
  drawer.addEventListener('pointercancel', end);
}
