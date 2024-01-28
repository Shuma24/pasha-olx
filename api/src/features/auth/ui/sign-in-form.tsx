import { UiButton, UiTextInputField } from '@/src/shared/ui';
import { useSignInForm } from '../model/use-sign-in-form';

export const SignInForm = () => {
  const { handleSubmit, isLoading, register, errorMessage } = useSignInForm();

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      <UiTextInputField
        label='Login'
        inputProps={{ type: 'text', minLength: 6, required: true, ...register('login') }}
      />
      <UiTextInputField
        label='Password'
        inputProps={{
          type: 'password',
          ...register('password', { required: true }),
        }}
      />
      <UiButton disabled={isLoading} variant='primary'>
        Sign In
      </UiButton>

      {errorMessage && <div className='text-rose-500'>{errorMessage}</div>}
    </form>
  );
};
