const generateAllSeedData = require('./seedingUtils.js');

describe('Seed Generation', () => {
  describe('seed generation function', () => {
    test('Creates one set of User and Project data', () => {
      const single = generateAllSeedData(1);
      expect(single.users.length).toBe(1);
      expect(single.projects.length).toBe(0);
    });

    test('Creates multiple updates', () => {
      const single = generateAllSeedData(1);
      expect(single.updates.length).toBeGreaterThan(0);
    });

    test('Can create several sets of data', () => {
      const SEED_SIZE = 10;
      const several = generateAllSeedData(SEED_SIZE);
      expect(several.users.length).toBe(SEED_SIZE);
      expect(several.projects.length).toBe(SEED_SIZE);
      expect(several.updates.length).toBeGreaterThan(SEED_SIZE);
    });

    test('Foreign key relationships are matched up correctly', () => {
      const single = generateAllSeedData(1);
      expect(single.users.userId).toBe(single.projects.ownerId);
      expect(single.users.userId).toBe(single.updates.postedBy);
      expect(single.projects.projectId).toBe(single.updates.projectId);
    });

    test('User data has the correct shape', () => {
      const user = generateAllSeedData(1).users[0];
      expect(user).toHaveProperty('userId', expect.any(Number));
      expect(user).toHaveProperty('userName', expect.any(String));
    });

    test('Project data has the correct shape', () => {
      const project = generateAllSeedData(1).projects[0];
      expect(project).toHaveProperty('projectId', expect.any(Number));
      expect(project).toHaveProperty('ownerId', expect.any(Number));
      expect(project).toHaveProperty('projectName', expect.any(String));
    });

    test('Update data has the correct shape', () => {
      const update = generateAllSeedData(1).updates[0];
      expect(update).toHaveProperty('id', expect.any(Number));
      expect(update).toHaveProperty('projectId', expect.any(Number));
      expect(update).toHaveProperty('postedBy', expect.any(Number));
      expect(update).toHaveProperty('title', expect.any(String));
      expect(update).toHaveProperty('body', expect.any(String));
      expect(update).toHaveProperty('likes', expect.any(Number));
      expect(update).toHaveProperty('pubDate', expect.stringMatching(/\d\d\d\d-\d\d-\d\d\s\d\d:\d\d:\d\d/));
    });
  });
});
