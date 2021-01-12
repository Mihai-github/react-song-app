import {gql} from '@apollo/client';

export const CreateQrCodeMutation = gql`
    mutation createQrCode($play_list_id: ID!, $song_id: ID!, $qrCode: String!){
        createQrCode(play_list_id: $play_list_id, song_id: $song_id, qrCode: $qrCode){
            id
            playList{
                id
                name
            }
            song{
                id
                title
                artist
            }
        }   
    }
`