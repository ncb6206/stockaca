import { fireEvent, getByPlaceholderText, render } from '@testing-library/react';
import LoginForm from '@/app/_components/common/LoginForm';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));

// jest.mock('firebase/auth', () => ({
//   signInWithEmailAndPassword: jest.fn(),
// }));

describe('LoginForm', () => {
  test('빈 입력으로 폼 제출 시 에러 메시지 표시', async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: '/로그인' }));
    const emailInput = getByPlaceholderText('이메일 주소');
    const passwordInput = getByPlaceholderText('비밀번호');
    const loginButton = getByLabelText('로그인');

    fireEvent.change(emailInput, { target: { value: 'test@naver.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234!' } });

    expect(loginButton).not.toBeDisabled();
  });
});
