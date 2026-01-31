import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { User, ShieldCheck } from 'lucide-react';

const Login = () => {
    const { login, loading, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin');
            else navigate('/student');
        }
    }, [user, navigate]);

    const handleLogin = async (role) => {
        await login(role);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary-500">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold text-gray-900">EduComp</CardTitle>
                    <p className="text-slate-500 mt-2">Competition Management Platform</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <p className="text-center text-sm font-medium text-slate-600 mb-2">Select your role to sign in</p>
                    <div className="grid gap-4">
                        <Button
                             variant="secondary"
                             className="h-20 justify-start gap-4 text-base hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-all"
                             onClick={() => handleLogin('student')}
                             disabled={loading}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                                <User className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-gray-900">Student</div>
                                <div className="text-xs text-slate-500 font-normal">Access your dashboard and results</div>
                            </div>
                        </Button>
                        <Button
                             variant="secondary"
                             className="h-20 justify-start gap-4 text-base hover:border-purple-500 hover:text-purple-700 hover:bg-purple-50 transition-all"
                             onClick={() => handleLogin('admin')}
                             disabled={loading}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 shrink-0">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-gray-900">Administrator</div>
                                <div className="text-xs text-slate-500 font-normal">Manage competitions and students</div>
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
