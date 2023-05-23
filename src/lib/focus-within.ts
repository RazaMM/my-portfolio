export function focusWithin(node: Node) {
    function focusOutside(e: Event) {
        if (!node.contains((e as FocusEvent).relatedTarget as Node)) {
            node.dispatchEvent(new CustomEvent("focusoutside", { bubbles: false }));
        }
    }

    function focusInside(e: Event) {
        if (!node.contains((e as FocusEvent).relatedTarget as Node)) {
            node.dispatchEvent(new CustomEvent("focusinside", { bubbles: false }));
        }
    }

    node.addEventListener("focusin", focusInside);
    node.addEventListener("focusout", focusOutside);

    return {
        destroy() {
            node.removeEventListener("focusin", focusInside);
            node.removeEventListener("focusout", focusOutside);
        },
    };
}
