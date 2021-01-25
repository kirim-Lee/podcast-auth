import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  loginMutation,
  loginMutationVariables,
} from './__generated__/loginMutation';
import { TOKEN, isLoggedInVar, authToken } from './apollo';
import { FormError } from './form-error';

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

export const LoggedOut = () => {
  const onCompleted = ({ login: { ok, token } }: loginMutation) => {
    if (ok && token) {
      localStorage.setItem(TOKEN, token);
      isLoggedInVar(true);
      authToken(token);
    }
  };

  const onError = () => null;

  const [login, { data: loginResult, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
    onError,
  });

  const { register, handleSubmit, errors } = useForm<loginMutationVariables>();

  const onSubmit = (loginData: loginMutationVariables) => {
    login({ variables: loginData });
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center flex-col">
      <div className="w-full max-w-screen-sm px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 ">
          <input
            type="email"
            placeholder="email"
            className="bg-white py-3 px-2 border-2 border-gray-200 focus:outline-none hover:bg-gray-100 focus:border-blue-600 transition-colors"
            name="email"
            ref={register({ required: 'email is required' })}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          <input
            placeholder="password"
            type="password"
            className="bg-white py-3 px-2 border-2 border-gray-200 focus:outline-none hover:bg-gray-100 focus:border-blue-600 transition-colors"
            name="password"
            ref={register({ required: 'password is requireed' })}
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
          <button className="py-3 px-2 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:bg-gray-200 focus:outline-none">
            login
          </button>
          {loginResult?.login?.error && (
            <FormError errorMessage={loginResult.login.error} />
          )}
          {error?.message && <FormError errorMessage={error.message} />}
        </form>
      </div>
    </div>
  );
};
