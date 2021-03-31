import React from 'react';


import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import { SIGNUP_USER } from '../../queries'
import { Mutation } from 'react-apollo';

import Error from '../Error';


const initialState = {

    username: "",

    email: "",

    password: "",

    passwordConfirmation: "",

    userType: "buyer"

};

class Signup extends React.Component {

    state = { ...initialState };

    clearState = () => {

        this.setState({ ...initialState });

    }

    handleChange = event => {

        const { name, value } = event.target;

        this.setState({

            [name]: value

        })
    };

    handleSubmit = (event, signupUser) => {

        event.preventDefault();

        signupUser().then(async ({ data }) => {

            localStorage.setItem('token', data.signupUser.token);

            await this.props.refetch();

            this.clearState();

            this.props.history.push('/user/' + user)

        });

    }

    validateForm = () => {

        const { username, email, password, passwordConfirmation, userType } = this.state;

        const isInvalid = !username || !email || !password || password !== passwordConfirmation || !userType;

        return isInvalid;

    }

    render() {

        const { username, email, password, passwordConfirmation, userType } = this.state;


        return (
            <div className='signup-form'>

                <h2 >Signup</h2>

                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password, userType }}>

                    {
                        (signupUser, { data, loading, error }) => {

                            return (

                                <form className='form' onSubmit={event => this.handleSubmit(event, signupUser)}>



                                    <TextField style={{ marginTop: 20 }} type="text" name="username" value={username} onChange={this.handleChange} label="Username" variant="outlined" />

                                    <TextField style={{ marginTop: 10 }} type="email" name="email" value={email} onChange={this.handleChange} label="E-mail address" variant="outlined" />

                                    <TextField style={{ marginTop: 10 }} type="password" name="password" value={password} onChange={this.handleChange} label="Password" variant="outlined" />

                                    <TextField style={{ marginTop: 10 }} type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} label="Confirm Password" variant="outlined" />

                                    <FormControl style={{ marginTop: 20 }} component="fieldset">
                                        <FormLabel component="legend">Account type</FormLabel>
                                        <RadioGroup name="userType" value={userType} onChange={this.handleChange}>
                                            <FormControlLabel value={"seller"} control={<Radio />} label="Seller" />
                                            <FormControlLabel value={"buyer"} control={<Radio />} label="Buyer" />
                                        </RadioGroup>
                                    </FormControl>

                                    <Button type="submit" disabled={loading || this.validateForm()} style={{ marginTop: 10 }} variant="contained">Submit</Button>

                                    {error && <Error error={error} />}

                                </form>

                            )
                        }
                    }



                </Mutation>

            </div>
        )
    }

}


export default withRouter(Signup);