import React, {useState} from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithEmailPassword } from '../../utils/firebase/firebase.utils';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        // create user doc
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const logInEmailPasswordUser = async (event) => {
        event.preventDefault();

        try {
            const checkUser = await signInWithEmailPassword(email, password);

            // reset form fields to default
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error); 
            }
        }
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                    <Button type='submit' onClick={logInEmailPasswordUser}>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
        </div>
    )
}

export default SignInForm;