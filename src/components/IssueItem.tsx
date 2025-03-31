import React from 'react';

type IssueItemProps = {
  title: string;
  description: string;
  details: string[];
  keywords?: string[];
  performance?: { key: string; value: string }[];
};

export const IssueItem = ({
  title,
  description,
  details,
  keywords,
  performance,
}: IssueItemProps) => (
  <div className="p-4 bg-gray-100 rounded border border-gray-300">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-700 mb-4">{description}</p>
    <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
      {details.map((detail, idx) => (
        <li key={idx}>{detail}</li>
      ))}
    </ul>
    {keywords && (
      <>
        <h4 className="font-medium text-sm mb-2">Keywords</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </>
    )}
    {performance && (
      <>
        <h4 className="font-medium text-sm mb-2">Performance Metrics</h4>
        <table className="w-full text-sm">
          <tbody>
            {performance.map((item, idx) => (
              <tr key={idx}>
                <td className="pr-4 text-gray-600">{item.key}</td>
                <td className="text-gray-800">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);
