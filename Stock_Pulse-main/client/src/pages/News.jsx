import "./news.css";

export default function News() {

  const news = [
    {
      title: "Reliance expands telecom network across India",
      sentiment: "positive"
    },
    {
      title: "Infosys faces slowdown in global IT demand",
      sentiment: "negative"
    },
    {
      title: "NIFTY remains stable amid mixed global cues",
      sentiment: "neutral"
    }
  ];

  return (
    <div className="content">

      <h2>News & Sentiment</h2>

      <div className="grid">

        {/* NEWS LIST */}
        <div className="card">
          {news.map((n, i) => (
            <div key={i} className="news-item">
              <p>{n.title}</p>
              <span className={`tag ${n.sentiment}`}>
                {n.sentiment}
              </span>
            </div>
          ))}
        </div>

        {/* SENTIMENT SUMMARY */}
        <div className="card">

          <h3>Market Sentiment</h3>

          <div className="bar">
            <div className="fill"></div>
          </div>

          <p className="green">Bullish (65%)</p>

          <div className="sentiment-list">
            <p>RELIANCE — Positive</p>
            <p>TCS — Neutral</p>
            <p>INFY — Negative</p>
          </div>

        </div>

      </div>

    </div>
  );
}