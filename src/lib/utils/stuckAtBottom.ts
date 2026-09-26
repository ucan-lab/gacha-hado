/**
 * `position: sticky; bottom: -1px` の要素が画面下端に貼り付いているかを通知する Svelte アクション。
 * 貼り付くと 1px だけ画面外にはみ出して交差率が 1 を下回るので、それを IntersectionObserver で拾う。
 * 画面上端から出ていった場合も交差率は下がるため、要素の上端が画面内にあることも条件にする。
 */
export const isStuckAtBottom = (
  entry: Pick<IntersectionObserverEntry, 'intersectionRatio' | 'boundingClientRect'>
) => entry.intersectionRatio < 1 && entry.boundingClientRect.top > 0;

export const stuckAtBottom = (node: HTMLElement, onChange: (stuck: boolean) => void) => {
  if (typeof IntersectionObserver === 'undefined') return {};

  let notify = onChange;
  const observer = new IntersectionObserver(([entry]) => notify(isStuckAtBottom(entry)), {
    threshold: [1]
  });
  observer.observe(node);

  return {
    update(next: (stuck: boolean) => void) {
      notify = next;
    },
    destroy() {
      observer.disconnect();
    }
  };
};
