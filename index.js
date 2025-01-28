/**
 * Repository Monitor Bot
 * Listens for changes on main/master branches and logs webhook messages
 * @param {import('probot').Probot} app
 */
export default (app) => {
  // Listen for push events
  app.on('push', async (context) => {
    const branch = context.payload.ref.replace('refs/heads/', '');
    
    // Check if push is to main or master branch
    if (branch === 'main' || branch === 'master') {
      // Get repository details
      const repo = context.payload.repository.name;
      const owner = context.payload.repository.owner.login;
      
      // Log the webhook payload details
      app.log.info('Repository Update Detected! 🔍');
      app.log.info(`Repository: ${owner}/${repo}`);
      app.log.info(`Branch: ${branch}`);
      app.log.info(`Pusher: ${context.payload.pusher.name}`);
      app.log.info(`Commit Count: ${context.payload.commits.length}`);
      
      // Log each commit
      context.payload.commits.forEach(commit => {
        app.log.info('-------------------');
        app.log.info(`Commit: ${commit.id.substring(0, 7)}`);
        app.log.info(`Message: ${commit.message}`);
        app.log.info(`Author: ${commit.author.name}`);
        app.log.info(`Modified files: ${commit.modified.length}`);
        app.log.info(`Added files: ${commit.added.length}`);
        app.log.info(`Removed files: ${commit.removed.length}`);
      });
    }
  });
};