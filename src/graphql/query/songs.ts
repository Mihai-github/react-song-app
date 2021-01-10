import {gql} from '@apollo/client';

export const GetSongsQuery = gql`
    query {
      songs {
        id
        title
        artist
        description
        duration
        type
        url
        playList{
            id
            name
        }
      }
    }
  `;
