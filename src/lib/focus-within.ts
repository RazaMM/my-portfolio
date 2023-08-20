import type { Action } from 'svelte/action';

interface FocusWithinEvents {
  'on:focusinside': (e: CustomEvent<void>) => void;
  'on:focusoutside': (e: CustomEvent<void>) => void;
}

export const focusWithin: Action<HTMLElement, undefined, FocusWithinEvents> = (node: Node) => {
  const focusOutside = (e: Event) => {
    if (!node.contains((e as FocusEvent).relatedTarget as Node)) {
      node.dispatchEvent(new CustomEvent('focusoutside', { bubbles: false }));
    }
  };

  const focusInside = (e: Event) => {
    if (!node.contains((e as FocusEvent).relatedTarget as Node)) {
      node.dispatchEvent(new CustomEvent('focusinside', { bubbles: false }));
    }
  };

  node.addEventListener('focusin', focusInside);
  node.addEventListener('focusout', focusOutside);

  return {
    destroy() {
      node.removeEventListener('focusin', focusInside);
      node.removeEventListener('focusout', focusOutside);
    }
  };
};
