function createData(
  id: number,
  platform: string,
  postContent: string,
  postDate: string,
  likes: number,
  comments: number,
  retweets: number,
  link: string
) {
  return {
    id,
    platform,
    postContent,
    postDate,
    likes,
    comments,
    retweets,
    link,
  };
}

export const mockPosts = [
  createData(
    1,
    'twitter',
    `It’s raining, or else I would be drinking wine in the hot tub, not drinking wine and watching Netflix. Also I am not at MY home, hence the hot tub.`,
    '30 July 2022',
    1133,
    2319,
    103,
    'https://twitter.com/?lang=en'
  ),
  createData(
    2,
    'twitter',
    `Ok no more staying up late watching Netflix for me`,
    '28 July 2022',
    1000,
    491,
    260,
    'https://twitter.com/?lang=en'
  ),
  createData(
    3,
    'twitter',
    `Idk why I won’t just get in bed at night. I do the same shit, turn on Netflix, watch an episode, wake up with a crook in my neck and slob on my chest 🤣🤣🤣... I dead ass be in here looking deceased`,
    '29 July 2022',
    2512,
    23,
    203,
    'https://twitter.com/?lang=en'
  ),
  createData(
    4,
    'twitter',
    `Been watching Rain on netflix, a post-apocalyptic series and y'all...

    I'm like, "OMG YOU'RE ON A DEADLINE QUIT WASTING TIME!"
    &amp; "YOU CAN'T BE ON MY TEAM."
    &amp; "Oh sure, let's kill all the plants and mope around  like that'll solve anything. AT LEAST BE USEFUL!"`,
    '29 July 2022',
    982,
    672,
    130,
    'https://twitter.com/?lang=en'
  ),
  createData(
    5,
    'twitter',
    `@pfmonaco After is better, for me, depending on how physical the dataset was, a shower, a pill, a sofa and something good to watch on Netflix.`,
    '30 July 2022',
    842,
    293,
    94,
    'https://twitter.com/?lang=en'
  ),
  createData(
    6,
    'twitter',
    `I thought I was gonna be productive today buuuut I decided to order food and sit on the couch and binge Netflix 😜😇🙃`,
    '31 July 2022',
    9238,
    5384,
    2348,
    'https://twitter.com/?lang=en'
  ),
  createData(
    7,
    'twitter',
    `Idk why I won’t just get in bed at night. I do the same shit, turn on Netflix, watch an episode, wake up with a crook in my neck and slob on my chest 🤣🤣🤣... I dead ass be in here looking deceased`,
    '31 July 2022',
    6278,
    8283,
    4290,
    'https://twitter.com/?lang=en'
  ),
];
