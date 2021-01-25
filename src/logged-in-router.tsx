import { gql, useQuery } from '@apollo/client';
import { authToken, isLoggedInVar, TOKEN } from './apollo';
import { meQuery } from './__generated__/meQuery';
import {
  faHeadphonesAlt,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserRole } from './__generated__/globalTypes';

const USER_INFO = gql`
  query meQuery {
    me {
      id
      role
      email
    }
  }
`;

export const LoggedIn = () => {
  const { loading, error, data } = useQuery<meQuery>(USER_INFO);

  const handleClick = () => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    authToken(null);
  };

  console.log(loading, error, data);

  return (
    <div className="bg-red-500 text-white text-4xl h-screen flex justify-center items-center">
      {data && (
        <span>
          Hello,
          <span className="px-2">
            {data && data.me?.role === UserRole.Listener ? (
              <FontAwesomeIcon
                icon={faHeadphonesAlt}
                className="text-yellow-300 px-1"
              />
            ) : (
              <FontAwesomeIcon
                icon={faMicrophoneAlt}
                className="text-yellow-300 px-1"
              />
            )}
            {data?.me.email || ''}
          </span>
          )
        </span>
      )}
      you can just
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
