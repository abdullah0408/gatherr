"use server";

import prisma from "./prisma";
import { unstable_cache } from "next/cache";

async function getTrendingTopics() {
  const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
      SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) as count
      FROM posts
      GROUP BY (hashtag)
      ORDER BY count DESC, hashtag ASC
      LIMIT 5
    `;

  return result.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));
}

const cachedTrendingTopics = unstable_cache(
  getTrendingTopics,
  ["trending_topics"],
  { revalidate: 3 * 60 * 60 },
);

export default cachedTrendingTopics;