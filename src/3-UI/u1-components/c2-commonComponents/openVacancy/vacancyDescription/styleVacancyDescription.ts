import {createStyles} from "@mantine/core";


export const useStyles = createStyles((theme) => ({

    vacancyContainer: {
        maxWidth: `773px`,
        backgroundColor: '#FFFFFF',
        padding: '4px 0px 24px',
        border: '1px solid #EAEBED',
        borderRadius: '12px',
        marginTop: '20px',
        textAlign: 'left',

        h4: {
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '20px',
            padding: '0px 24px 0px 24px',
            marginBottom: '16px',
            marginTop: '20px',
        },

        ul: {
            padding: '0px 24px 0px 24px',
            maxWidth: `725px`,

            li: {
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                width: `100%`,

                div: {
                    width: `100%`,
                    span: {
                        display: "inline-block",
                        maxWidth: `700px`,
                        wordWrap: 'break-word',
                    }
                }
            }
        },

    }
}))