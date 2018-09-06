import React, { SyntheticEvent } from 'react';
import { Button, Form, InputOnChangeData } from 'semantic-ui-react';
import Layout from '../components/layout';

export default class LoginComponent extends React.Component {
    public state: LoginState = {
        username: '',
        password: '',
    };

    login = async (): Promise<void> => {
        const { username, password } = this.state;

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password }),
        });

        console.log('response status', response.status);
        console.log('response status text', response.statusText);
        console.log('response body', response.json());
    }

    updateField = (_e: SyntheticEvent, { name, value }: InputOnChangeData): void => {
        this.setState({ [name]: value });
    }

    render() {
        const { username, password } = this.state;

        return (
            <Layout>
                <Form onSubmit={this.login}>
                    <Form.Input label="Username" name="username" value={username} onChange={this.updateField} />
                    <Form.Input label="Password" name="password" value={password} onChange={this.updateField} type="password" />

                    <Button type="submit">Submit</Button>
                </Form>
            </Layout>
        );
    }
}
