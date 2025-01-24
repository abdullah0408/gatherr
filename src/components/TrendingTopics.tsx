import React from 'react'
import cachedTrendingTopics from '@/lib/getTrendingTopics'
import { formatNumber } from '@/lib/utils'
import Link from 'next/link'
async function TrendingTopics() {
    const TrendingTopics = await cachedTrendingTopics();
    return (
      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-xl font-bold">Trending Topics</div>
        {TrendingTopics.map(({ hashtag, count }) => {
          const title = hashtag.split("#")[1];
          return (
            <Link key={title} href={`/hashtag/${title}`} className="block">
              <p
                className="line-clamp-1 break-all font-semibold hover:underline"
                title={hashtag}
              >
                {hashtag}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatNumber(count)} {count === 1 ? "post" : "posts"}
              </p>
            </Link>
          );
        })}
      </div>
    );}

export default TrendingTopics