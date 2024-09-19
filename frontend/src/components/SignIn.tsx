import React from 'react'
import GoogleLogo from './GoogleLogo'
import useEphemeralKeyPair from '../core/useEphemeralKeyPair';
import { GOOGLE_CLIENT_ID } from '../core/constants';

const SignIn = () => {
    const ephemeralKeyPair = useEphemeralKeyPair();

    const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  
    const searchParams = new URLSearchParams({
      /**
       * Replace with your own client ID
       */
      client_id: GOOGLE_CLIENT_ID,
      /**
       * The redirect_uri must be registered in the Google Developer Console. This callback page
       * parses the id_token from the URL fragment and combines it with the ephemeral key pair to
       * derive the keyless account.
       *
       * window.location.origin == http://localhost:5173
       */
      redirect_uri: `${window.location.origin}/callback`,
      /**
       * This uses the OpenID Connect implicit flow to return an id_token. This is recommended
       * for SPAs as it does not require a backend server.
       */
      response_type: "id_token",
      scope: "openid email profile",
      nonce: ephemeralKeyPair.nonce,
    });
    redirectUrl.search = searchParams.toString();
  return (
    <div>
       <a
          href={redirectUrl.toString()}
          className="flex justify-center items-center rounded-full px-8 py-2 font-primary bg-[#e5ffad]/90 hover:bg-[#e5ffad] active:scale-95 transition-all"
        >
          <GoogleLogo />
          Sign in with Google
        </a>
    </div>
  )
}

export default SignIn
