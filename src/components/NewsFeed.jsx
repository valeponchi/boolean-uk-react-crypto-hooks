import useStatusUpdates from "./hooks/useStatusUpdates";
import NewsCard from "./NewsCard";

function NewsFeed() {

  const newsList = useStatusUpdates()

  return (
    <ul className="newsfeed">
      {newsList.map((newsItem) => (
        <li>
          <NewsCard newsItem={newsItem} />
        </li>
      ))}
    </ul>
  );
}

export default NewsFeed
