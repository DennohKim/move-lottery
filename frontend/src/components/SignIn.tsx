import React, { useEffect } from "react";
import GoogleLogo from "./GoogleLogo";
import useEphemeralKeyPair from "../core/useEphemeralKeyPair";
import { GOOGLE_CLIENT_ID } from "../core/constants";
import { useKeylessAccounts } from "../core/useKeylessAccounts";
import { useNavigate } from "react-router-dom";
import { collapseAddress } from "../core/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();

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

  useEffect(() => {
    if (!activeAccount) navigate("/");
  }, [activeAccount, navigate]);

  return (
    <>
      <div className="grid gap-2">
        {activeAccount && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex justify-center items-center space-x-2 rounded-full px-8 py-2 font-primary text-black bg-[#e5ffad]/90 hover:bg-[#e5ffad] active:scale-95 transition-all">
                <div className="flex items-center">
                  <GoogleLogo />
                  <span className="ml-2">
                    {collapseAddress(activeAccount?.accountAddress.toString())}
                  </span>
                </div>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full ">
              <DropdownMenuItem onSelect={disconnectKeylessAccount}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {!activeAccount && (
        <div>
          <a
            href={redirectUrl.toString()}
            className="flex justify-center items-center rounded-full px-8 py-2 font-primary bg-[#e5ffad]/90 hover:bg-[#e5ffad] active:scale-95 transition-all"
          >
            <GoogleLogo />
            Sign in with Google
          </a>
        </div>
      )}
    </>
  );
};

export default SignIn;
