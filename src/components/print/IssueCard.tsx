interface Issue {
  title: string;
  asIs: string[];
  toBe: string[];
  result: string[];
}

export default function IssueCard({ title, asIs, toBe, result }: Issue) {
  return (
    <div className="mb-16">
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      <div className="mb-6">
        <p className="text-lg font-bold mb-1">AS-IS</p>
        <ul className="list-disc list-inside">
          {asIs.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <p className="text-lg font-bold mb-1">TO-BE</p>
        <ul className="list-disc list-inside">
          {toBe.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-lg font-bold mb-1">결과</p>
        <ul className="list-disc list-inside">
          {result.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
