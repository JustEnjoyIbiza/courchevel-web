/**
 * Back closes an open drawer instead of leaving the page (owner, 26 Oct 2026: the experience
 * details on /experiences/). Opening a drawer adds a history entry, so the phone's back gesture
 * or the browser's back button closes it and the page stays; closing it any other way (Close,
 * Esc, a click outside, a swipe, the enquiry link) removes that entry again, so the next back
 * leaves the page as usual.
 */
export function closeOnBack(drawers: HTMLElement[]) {
  const openDrawer = () => drawers.find((d) => d.matches(':popover-open'));

  for (const drawer of drawers) {
    drawer.addEventListener('toggle', (e) => {
      if ((e as ToggleEvent).newState === 'open') {
        // One entry for whichever drawer is open: opening another one replaces it.
        if (history.state?.drawer) history.replaceState({ ...history.state, drawer: drawer.id }, '');
        else history.pushState({ ...history.state, drawer: drawer.id }, '');
      } else if (history.state?.drawer === drawer.id && !openDrawer()) {
        // Closed on the page: drop its entry without scrolling back to where the drawer opened
        // (the enquiry link scrolls down to the form at the same moment).
        history.scrollRestoration = 'manual';
        history.back();
      }
    });
  }

  addEventListener('popstate', () => {
    setTimeout(() => (history.scrollRestoration = 'auto'));
    const open = openDrawer();
    if (open && history.state?.drawer !== open.id) open.hidePopover();
  });
}
