import React, { useEffect } from 'react';
import Head from 'next/head';
import Store from 'electron-store';
import LoginConfig from '../models/LoginConfig'
import ILoginConfig from '../models/ILoginConfig';

export default function Login() {
    
    const storeKey = "loginConfig";
    const store = new Store();
    
    const fillFields = () => {
        console.log("try to fill");
        const config = store.get(storeKey) as ILoginConfig;
        (document.getElementById('host') as HTMLInputElement).value = config.host;
        (document.getElementById('user') as HTMLInputElement).value = config.username;
        (document.getElementById('password') as HTMLInputElement).value = config.password;
    }

    const saveFields = () => {
        console.log("try to save");
        const host = (document.getElementById('host') as HTMLInputElement)?.value;
        const userName = (document.getElementById('user') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;
        const config = new LoginConfig(host, userName, password); 
        store.set(storeKey, config)
    }

    const signIn = () => {
        console.log("try to login");
        const needToSave = (document.getElementById('needToSave') as HTMLInputElement)?.value;
        if (needToSave) {
            saveFields();
        }
    };

    useEffect( () => {
        console.log("effect call");
        if (store.has(storeKey)) {
            fillFields();
        }    
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>Login</title>
            </Head>
            <div className='grid grid-col-1 text-2xl w-full text-center'>
                <span>Choose server and use your credentials to sign in</span>
                <br/>
                <div className='grid text-2xl w-full text-center text-blue-800'>
                    <span>Host:</span>
                    <input type={'text'} id='host'></input>
                    <span>Username/E-mail:</span>
                    <input type={'text'} id='user'></input>
                    <span>Password:</span>
                    <input type={'password'} id='password'></input>
                    <div className='inline-block'>
                        <input type={'checkbox'} id='needToSave'></input>
                        <span>Save credentials</span>
                    </div>
                </div>
                <button onClick={fillFields}>Fill fields from store</button>
                <button onClick={signIn}>Sign In</button>

            </div>
        </React.Fragment>
    );
}