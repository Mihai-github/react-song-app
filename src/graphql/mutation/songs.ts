import {gql} from '@apollo/client';

// export const CreateSongMutation = gql`
//     mutation createSong($id: ID, $title: String!, $artist: String!, $description: String, $url: String!, $type: MusicType!){
//         createSong(id: $id, title: $title, artist: $artist, description: $description, type: $type, url: $url){
//             id
//             title
//             artist
//             description
//             type
//             url
//         }
//     }
// `;

export const CreateSongsMutation = gql`
    mutation createSongs($song: ICreateSong!){
        createSongs(input: $song){
            id
            title
            artist
            description
            type
            url
            duration
            playList{
                id
                name
            }
        }
    }
`


export const DeleteSongMutation = gql`
    mutation deleteSong($id: ID!){
        deleteSong(id: $id){
            id
            title
            artist
            url
            type
            description
        }
    }
`