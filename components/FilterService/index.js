// filterUtils.js

export const filterProviders = (providers, skillsFilter, needsFilter) => {
  return providers.filter((provider) => {
    const skillsMatch = !skillsFilter || provider.skills.includes(skillsFilter);
    const needsMatch = !needsFilter || provider.needs.includes(needsFilter);
    return skillsMatch && needsMatch;
  });
};
