export function qs<T extends Element>(
  selector: string,
  context: ParentNode = document
): T {
  const el = context.querySelector<T>(selector);
  if (!el) throw new Error(`Element not found: "${selector}"`);
  return el;

}
