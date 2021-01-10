import {gql} from '@apollo/client';

export const GetPlayListsQuery = gql`
    query {
      playList {
        id
        name
        imageUrl
      }
    }
  `;

export const GetPlayListSongs = gql`
    query
        playListSongs($id: ID!){
            playListSongs(play_list_id: $id){
                id
                artist
                title
                type
                description
                duration
                url
                playList{
                    id
                    name
                    imageUrl
                }
            }
        }
    
`

export const GetCurrentPlayList = gql`
    query
        getPlayList($id: ID!){
            getPlayList(id: $id){
                id
                name
                imageUrl
            }
        }
`
