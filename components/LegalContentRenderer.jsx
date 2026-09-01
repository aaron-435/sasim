import React from "react";

/**
 * LegalContentRenderer — renders a lib/legalContent.ts `LegalDocument`.
 * Supports minimal inline `**bold**` markup in `p`/`list` text (split on
 * the `**...**` pairs) — deliberately not a full markdown parser, this
 * is legal copy that gets a real review pass, not a rich-text CMS.
 */
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const styleFor = {
  highlight: { background: "rgba(201,162,75,0.06)", border: "1px solid rgba(201,162,75,0.25)", borderRadius: "10px", padding: "14px 16px", color: "#C7C3D1" },
  muted: { color: "#847E90", fontSize: "12.5px" },
};

export default function LegalContentRenderer({ doc }) {
  return (
    <>
      {doc.sections.map((section, si) => (
        <React.Fragment key={si}>
          {section.heading && (
            <h2 style={section.headingColor ? { color: section.headingColor } : undefined}>{section.heading}</h2>
          )}
          {section.body.map((item, bi) => {
            if (item.type === "p") {
              return (
                <p key={bi} style={item.style ? styleFor[item.style] : undefined}>
                  {renderInline(item.text)}
                </p>
              );
            }
            if (item.type === "list") {
              return (
                <ul key={bi}>
                  {item.items.map((li, li_i) => (
                    <li key={li_i}>{renderInline(li)}</li>
                  ))}
                </ul>
              );
            }
            if (item.type === "contact") {
              return (
                <p key={bi}>
                  {item.label}: <a href={`mailto:${item.email}`}>{item.email}</a>
                </p>
              );
            }
            return null;
          })}
        </React.Fragment>
      ))}
    </>
  );
}
