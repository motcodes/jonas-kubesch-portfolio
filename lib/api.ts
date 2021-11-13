import { accessToken, graphqlEndpoint } from 'prismicConfiguration'
import Client from './prismicHelper'

// @ts-ignore
export async function fetchApi(query: string, { variables } = {}) {
  const prismicAPI = await Client().getApi()
  const fetchURL = variables?.slug
    ? `${graphqlEndpoint}?query=${query}&variables=${JSON.stringify(variables)}`
    : `${graphqlEndpoint}?query=${query}`

  const res = await fetch(fetchURL, {
    headers: {
      'Prismic-Ref': prismicAPI.masterRef.ref,
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
  })

  if (res.status !== 200) {
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getGlobalData() {
  const data = await fetchApi(
    `
    query {
      global: allGlobals {
        edges {
          node {
            sitename
            logo
            metatitle
            metadescription
            metaimage
            email
          }
        }
      }
      socialMediaLinks: allSocial_media_linkss{
        edges {
          node {
            links{
              name
              url {
                ...on _ExternalLink{
                  url
                }
              }
            }
          }
        }
      }
    }
  `
  )

  const { metaimage } = data.global.edges[0].node

  const socialLinks = data.socialMediaLinks.edges[0].node.links.map((link) => ({
    title: link.name,
    url: link.url.url,
  }))

  return {
    global: {
      ...data.global.edges[0].node,
      metaimage: metaimage.url,
    },
    socialLinks: socialLinks,
  }
}

export async function getHomepage() {
  const data = await fetchApi(
    `
    query {
      homepage: allHomepages {
        edges{
          node{
            projects {
              item {
                ... on Project{
                  title
                  heroimage
                  description
                  _meta {
                    uid
                  }
                }
              }
            }
            education {
              item {
                ... on Education{
                  name
                  department
                  from
                  to
                }
              }
            }
          }
        }
      }
    }
  `
  )

  const education = data.homepage.edges[0].node.education.map(
    ({ item }) => item
  )

  const projects = data.homepage.edges[0].node.projects.map(({ item }) => ({
    ...item,
    title: item.title[0].text,
    description: item.description[0].text,
    slug: item._meta.uid,
  }))

  return {
    education,
    projects,
  }
}

export async function getAllProjects() {
  const data = await fetchApi(
    `
    {
      projects: allProjects {
        edges {
          node {
            title
            heroimage
            description
            _meta {
              uid
            }
          }
        }
      }
    }
    `
  )
  const projects = data.projects.edges.map(({ node }) => ({
    ...node,
    title: node.title[0].text,
    description: node.title[0].text,
    slug: node._meta.uid,
  }))
  return projects
}

export async function getProject(slug) {
  const data = await fetchApi(
    `
    query ProjectWithSlug($slug: String!) {
      project: allProjects(uid: $slug) {
        edges {
          node {
            title
            heroimage
            description
            projectdate
            projectlinkname
            projectlink{
              ...on _ExternalLink{
                url
              }
            }
            roles{
              role
            }
            credits{
              role
              name
            }
            body{
              ...on ProjectBodyContent {
                primary {
                  content
                }
              }
              ...on ProjectBodyImage {
                primary {
                  image
                }
              }
              ...on ProjectBodyFull_size_image{
                primary {
                  fullsizeimage
                }
              }
              ...on ProjectBodyImage_grid{
                fields{
                  image
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        slug,
      },
    }
  )

  const project = data.project.edges[0].node

  return {
    ...project,
    title: project.title[0].text,
    description: project.description[0].text,
    projectlink: project.projectlink?.url || '',
  }
}

export async function getProjectsWithSlug() {
  const data = await fetchApi(`
    {
      projects: allProjects {
        edges{
          node{
            _meta {
              uid
            }
          }
        }
      }
    }
  `)
  return data.projects.edges
}
