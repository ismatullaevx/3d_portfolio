/** Match `React.lazy` specifiers in App.jsx so Vite reuses the same chunk. */
const sectionPrefetchers = {
  about: () => import("../components/About"),
  projects: () => import("../components/Works"),
  cv: () => import("../components/CV"),
};

export function prefetchSectionByHashId(hashId) {
  const fn = sectionPrefetchers[hashId];
  if (fn) void fn();
}
