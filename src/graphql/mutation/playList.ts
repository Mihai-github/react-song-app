import {gql} from '@apollo/client';

export const CreatePlayListMutation = gql`
    mutation createPlayList($playList: IPlayListFields!){
        createPlayList(input: $playList){
            id
            name
            imageUrl
        }
    }
`

export const DeletePlayListMutation = gql`
    mutation deletePlayList($id: ID!){
        deletePlayList(id: $id){
            id 
            name
            imageUrl
        }
    }

`