import React, {useCallback, useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import AppNavigation from './appnavigation';
import { ColorPicker } from '@shopify/polaris';

const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
        scriptTag {
            id
        }
        userErrors {
            field
            message
        }
        }
    }
`;

const QUERY_SCRIPT_TAGS = gql`
    query{
        scriptTags(first: 15){
            edges {
            node {
                id
                src
                displayScope
            }
            }
        }
    }
`;

const DELETE_SCRIPT_TAG = gql`
    mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
  
`;

function ScriptPage() {

	useEffect(() => {
	   createScripts({
                    variables: {
                        input: {
                            src: "https://dev-cbf83a9.com/scripts.js",
                            displayScope: "ALL"
                        }
                    },
                    refetchQueries: [{ query: QUERY_SCRIPT_TAGS }]
                })
	}, []);
	

    const [color, setColor] = useState({
        hue: 120,
        brightness: 1,
        saturation: 1,
      });

    const handleChange = useCallback(setColor, []);

    console.log(setColor)
    console.log(color)

    const [createScripts] = useMutation(CREATE_SCRIPT_TAG)
    const [deleteScripts] = useMutation(DELETE_SCRIPT_TAG)
    const { loading, error, data } = useQuery(QUERY_SCRIPT_TAGS);

    if (loading) return <div>Loading..</div>
    if (error) return <div>{error.message}</div>
    console.log(data)

	

    return (
        <div>
            <AppNavigation />

            <button type="submit" onClick={() => {
                createScripts({
                    variables: {
                        input: {
                            src: "https://dev-cbf83a9.com/scripts.js",
                            displayScope: "ALL"
                        }
                    },
                    refetchQueries: [{ query: QUERY_SCRIPT_TAGS }]
                })
            }}
            >Create script Tag</button>

            Script Page

            {
                data.scriptTags.edges.map(item => {
                    return <div key={item.node.id}>
                        <p>{item.node.id}</p>
                        <button type="submit" onClick={() => {
                            deleteScripts({
                                variables: {
                                    id: item.node.id
                                },
                                refetchQueries: [{ query: QUERY_SCRIPT_TAGS }]
                            })
                        }
                        }>DELETE</button>
                    </div>
                })
            }

            <ColorPicker onChange={handleChange} color={color} allowAlpha />
        </div>
    )
}

export default ScriptPage;