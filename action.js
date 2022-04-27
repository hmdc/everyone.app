/**
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log("Yay! The app was loaded!");

  app.onAny(async context => {
    const org = context.payload.organization.login
    
    context.log.debug({
      event: context.name,
      action: context.payload.action,
      org: org
    })

    return createTeam(context, org, 'everyone').then( ({data: team}) => {
      context.log.debug({
        team: team
      })
      return populateTeam(context, org, team, 1, per_page)
    }).catch(error => {
      context.log.error({
        org: org,
        message: error.message
      })
    })
  })

};

async function createTeam(context, org, name) {
  return context.octokit.teams.create({
    org: org,
    name: name
  })
}

async function populateTeam(context, org, team, page = 1, per_page = 100) {
  const {data: members} = await context.octokit.orgs.listMembers({
    org: org, 
    per_page: per_page,
    page: page
  })
  
  context.log.debug({
    org: org, 
    team: team, 
    page: page, 
    per_page: per_page,
    members: members
  })

  if (members.length == per_page) {
    populateTeam(context, org, team, page+1, per_page)
  }

  for (const member of members) {
    // Adding a user to a team is idempotent. 
    context.octokit.teams.addOrUpdateMembershipForUserInOrg({
      org: org,
      team_slug: team.slug,
      username: member.login
    })
  } 
}
