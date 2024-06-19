import React from 'react';
import Plot from 'react-plotly.js';

const ResponseDisplay = ({ response }) => {
  const { "JD Match": jdMatch, MissingKeywords, "Profile Summary": profileSummary } = response;

  const percentageMatch = parseInt(jdMatch);
  const matchData = [
    {
      type: "pie",
      labels: ["Match", "Gap"],
      values: [percentageMatch, 100 - percentageMatch],
      textinfo: "label+percent",
      insidetextorientation: "radial"
    }
  ];

  const keywordsData = MissingKeywords.map(keyword => ({ keyword, count: 1 }));

  return (
    <div>
      <h3>Response:</h3>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <h3>Percentage Match:</h3>
      <p>{percentageMatch}%</p>
      <Plot data={matchData} layout={{ title: 'Match vs Gap' }} />
      {MissingKeywords.length > 0 && (
        <>
          <h3>Missing Keywords:</h3>
          <Plot
            data={[
              {
                x: keywordsData.map(d => d.keyword),
                y: keywordsData.map(d => d.count),
                type: 'bar'
              }
            ]}
            layout={{ title: 'Missing Keywords' }}
          />
        </>
      )}
      {profileSummary && (
        <>
          <h3>Profile Summary:</h3>
          <p>{profileSummary}</p>
        </>
      )}
    </div>
  );
};

export default ResponseDisplay;
