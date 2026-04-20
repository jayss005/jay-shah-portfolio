// Lightweight char/word splitter. Wraps each char or word in a span.
export const splitChars = (el: HTMLElement) => {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const spans: HTMLSpanElement[] = [];
  for (const ch of text) {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
    spans.push(span);
  }
  return spans;
};

export const splitWords = (el: HTMLElement) => {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const spans: HTMLSpanElement[] = [];
  const words = text.split(/(\s+)/);
  for (const w of words) {
    if (/^\s+$/.test(w)) {
      el.appendChild(document.createTextNode(w));
      continue;
    }
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = w;
    el.appendChild(span);
    spans.push(span);
  }
  return spans;
};
