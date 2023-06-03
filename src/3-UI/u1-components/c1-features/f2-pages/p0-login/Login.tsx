import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Group,
    PasswordInput,
    TextInput,
    Title
} from "@mantine/core";
import {useForm} from '@mantine/form';
import {PATH} from "../../../c2-commonComponents/routes/Routes";
import {LoaderComponent} from "../../../c2-commonComponents/loader/Loader";
import {ErrorComponent} from "../../../c2-commonComponents/error/ErrorComponent";
import {useStyles} from "./styleLogin";
import {useAppDispatch, useAppSelector} from "2-BLL/store";
import {errorAuth, isAuthorisedAuth, isLoadingAuth} from "2-BLL/authReucer/selectorsAuth";
import {authorisedWithPassword, setErrorAuthAC} from "2-BLL/authReucer/authReducer";

export const Login = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isAuthorised = useAppSelector(isAuthorisedAuth)
    const isLoading = useAppSelector(isLoadingAuth)
    const error = useAppSelector(errorAuth)

    const {classes, cx} = useStyles();

    const form = useForm({
        initialValues: {
            email: 'sergei.stralenia@gmail.com',
            password: 'paralect123',
        },
        validate: {
            email: (value: string) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length === 0 ? 'Password is required' : value.length < 5 ? 'Password is too short' : null),
        },
        transformValues: (values) => ({
            email: values.email,
            password: values.password,
        }),
    });

    useEffect(() => {
        if (isAuthorised) {
            navigate(PATH.VACANCY_SEARCH)
        }
    }, [isAuthorised])

    return (
        <Container className={classes.loginContainer}>
            <Box className={classes.loginBox}>
                {isLoading && <LoaderComponent/>}
                <Title order={2}>Login</Title>
                <form
                    onSubmit={form.onSubmit((values) => dispatch(authorisedWithPassword(values.email, values.password, 2356, 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948')))}>
                    <TextInput
                        label="Email"
                        placeholder="Your email"
                        withAsterisk
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        placeholder="Your password"
                        label="Password"
                        withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <Group position="center" mt="md">
                        <Button disabled={isLoading} type="submit">Submit</Button>
                    </Group>
                </form>
            </Box>

            <ErrorComponent errorMessage={error} setError={setErrorAuthAC}/>

        </Container>
    );
};

