import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email:', email);
  };

  return (
    <FormLayout>
      <form className="bg-white rounded py-16 px-12" onSubmit={handleSubmit}>
        <h3 className='text-4xl text-indigo-800 font-bold tracking-wide mb-8'>Reset password!</h3>
        <div className="mb-7">
          <Input id='email' type='email' label='Email' value={email} onChange={(newValue) => setEmail(newValue)} />
        </div>
          <Button text='Submit' />
          <div className='w-full h-0.5 bg-gray-200 mt-6 mb-4'></div>
          <div className="flex flex-row justify-center gap-2 text-indigo-700 font-semibold">
            <Link to='/login' className='transition duration-500 hover:text-indigo-800'>Sign In</Link>
            <p className='text-gray-400'>|</p>
            <Link to='/register' className='transition duration-500 hover:text-indigo-800'>Create account</Link>
          </div>
      </form>
    </FormLayout>
  );
};

export default ForgotPassword;