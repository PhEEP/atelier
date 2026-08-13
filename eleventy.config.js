import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/llms.txt": "llms.txt" });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/posts/*.njk")
      .sort((a, b) => a.date - b.date)
  );

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("filterBySeries", (posts, series) => {
    if (!series) return [];
    return posts
      .filter((p) => p.data.series === series)
      .sort((a, b) => a.data.seriesPart - b.data.seriesPart);
  });

  // { prev, next } relative to the current post's position in the
  // chronologically-sorted (oldest-first) posts collection. prev = the
  // post published just before this one, next = just after.
  eleventyConfig.addFilter("adjacentPosts", (posts, url) => {
    const idx = posts.findIndex((p) => p.url === url);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? posts[idx - 1] : null,
      next: idx < posts.length - 1 ? posts[idx + 1] : null,
    };
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
}
