// -- Prismic Repo Name
const repoName = process.env.PRISMIC_REPO_NAME

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.prismic.io/api/v2`
export const graphqlEndpoint = `https://${repoName}.cdn.prismic.io/graphql`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken =
  'MC5ZWGhtMWhJQUFDVUFNWU1Q.77-9Mu-_ve-_ve-_vSY477-9FO-_vQzvv73vv73vv70FTF9A77-9SyLvv73vv73vv73vv71OFF_vv71q77-9aA'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  return '/'
}

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
  ],
}
