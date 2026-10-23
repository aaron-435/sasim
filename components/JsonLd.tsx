/** Renders one <script type="application/ld+json"> per node. `<` is escaped so page text cannot close the tag. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const nodes = Array.isArray(data) ? data : [data];
  return (
    <>
      {nodes.map((n, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(n).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
