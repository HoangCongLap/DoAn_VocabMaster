import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useAuth } from '~/lib/firebase';
export default function Login() {
  const auth = useAuth();

  const handleClick = () => {
    console.log('auth', auth);
    if (auth) {
      const provider = new GoogleAuthProvider();
      auth.languageCode = 'en';

      signInWithRedirect(auth, provider);
    }
  };
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Vocab Master</h1>
          <p className="mb-5">Expand Your World, One Word at a Time!</p>
          <button className="btn btn-error" onClick={handleClick}>
            Google Login
          </button>
        </div>
      </div>
    </div>
  );
}
