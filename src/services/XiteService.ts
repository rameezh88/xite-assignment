const FEED_URL =
  'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

export default class XiteService {
  static getFeed(): Promise<FeedResponse> {
    return fetch(FEED_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }
}
