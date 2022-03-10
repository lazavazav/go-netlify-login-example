import React, { useContext } from 'react';
import getExample, { generateHeaders } from './fetch/api';
import { IdentityContext } from './identityContext';
const FAKE_CLAIM =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTQ2ODQ4MjAsInN1YiI6IjVmODExYzFkLWI2NGYtNGE0MC05NjMxLTdlNzg5YzI1ZGZiMSIsImVtYWlsIjoiZmFrZUBtYWlsLmNvbSIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnsiZnVsbF9uYW1lIjoiRmFrZXIifX0.Q_FP5e8aLVvvoWCGlxs91Y29AjeDuaKOfegJnh19pmQ';

export default function Protected() {
  const { user } = useContext(IdentityContext);
  const [response, setResponse] = React.useState('');
  const [jwt, setJWT] = React.useState('');
  const [fakeClaim, setFakeClaim] = React.useState(FAKE_CLAIM);

  React.useEffect(() => {
    if (user) {
      generateHeaders().then((h) => setJWT(h.Authorization.split(' ')[1]));
    }
  }, [user]);

  const submitFakeToken = () => {
    setResponse('');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${fakeClaim}`,
    };
    return getExample({ headers }).then((r) => setResponse(r));
  };

  const submitRealToken = () => {
    setResponse('');
    getExample({ headers: null }).then((r) => setResponse(r));
  };

  const handleOnChange = (e) => {
    setFakeClaim(e.value);
  };
  return (
    <div>
      <h3>Protected Page</h3>
      You are logged in as <b>{user ? user.email : ''}</b>
    </div>
  );
}

function Response({ response }) {
  if (!response) return null;
  const formattedResponse = JSON.stringify(
    JSON.parse(atob(response.identity_response)),
    null,
    2
  );
  return (
    <div>
      <h2>Response: </h2>
      <p>{response.msg}</p>
      <p>Netlify Identity Response: </p>
      <p>
        <pre>{formattedResponse}</pre>
      </p>
    </div>
  );
}
