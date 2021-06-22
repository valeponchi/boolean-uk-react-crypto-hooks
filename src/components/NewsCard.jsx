function NewsLink({ url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {url}
    </a>
  );
}

export default function NewsCard({ newsItem: { description } }) {
  return (
    <article className="newsfeed__card">
      <p>
        {description
          .split(/(https?:\/\/.*\b\/?)/g)
          .map((match) =>
            /https?/.test(match) ? <NewsLink url={match} /> : match
          )}
      </p>
    </article>
  );
}
