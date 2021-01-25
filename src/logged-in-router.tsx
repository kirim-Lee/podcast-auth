import { authToken, isLoggedInVar, TOKEN } from './apollo';

export const LoggedIn = () => {
  const handleClick = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    authToken(null);
  };

  return (
    <div className="bg-red-500 text-white text-4xl h-screen flex justify-center items-center">
      Hello, you can just
      <div className="m-4">
        <button
          className="rounded-lg bg-white text-red-500 px-2 focus:outline-none hover:bg-pink-700 hover:text-white transition-colors "
          onClick={handleClick}
        >
          log out
        </button>
      </div>
    </div>
  );
};
