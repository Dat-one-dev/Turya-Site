export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul className="marquee-group" key={copy}>
            {items.map((item) => (
              <li className="marquee-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
