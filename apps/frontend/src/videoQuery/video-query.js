import { gql } from '@apollo/client';

export const GET_VIDEOS = gql`
  query GetVedios($first: Int!) {
    allVideos(first: $first) {
      edges {
        node {
          id
          title
          media  # Add the media field to get the video URL
        }
      }
    }
  }
`;


// Query to fetch a single Vedio by ID
export const GET_VIDEO = gql`
  query GetVideo($id: ID!) {
    video(id: $id) {
      id
      title
    }
  }
`;
