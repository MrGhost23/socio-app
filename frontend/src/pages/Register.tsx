import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormLayout from '../components/FormLayout';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('FirstName:', firstName);
    console.log('LastName:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <FormLayout>
      <form className="bg-white rounded py-16 px-12" onSubmit={handleSubmit}>
        <h3 className='text-4xl text-indigo-800 font-bold tracking-wide mb-8'>Create an account!</h3>
        <div className="mb-7">
          <Input id='first-name' type='text' label='First Name' value={firstName} onChange={(newValue) => setFirstName(newValue)} />
        </div>
        <div className="mb-7">
          <Input id='last-name' type='text' label='Last Name' value={lastName} onChange={(newValue) => setLastName(newValue)} />
        </div>
        <div className="mb-7">
          <Input id='email' type='email' label='Email' value={email} onChange={(newValue) => setEmail(newValue)} />
        </div>
        <div className="relative mb-8">
          <Input id='password' type='password' label='Password' value={password} onChange={(newValue) => setPassword(newValue)} />
        </div>
          <Button text='Submit' />
          <div className='w-full h-0.5 bg-gray-200 mt-6 mb-4'></div>
          <div className="flex flex-row justify-center gap-2 text-indigo-700 font-semibold">
            <Link to='/login' className='transition duration-500 hover:text-indigo-800'>Sign In</Link>
            <p className='text-gray-400'>|</p>
            <Link to='/forgot-password' className='transition duration-500 hover:text-indigo-800'>Reset password</Link>
          </div>
      </form>
    </FormLayout>
  );
};

export default Register;